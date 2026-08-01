#!/usr/bin/env bash
# check.sh — pre-merge preflight for These Lucky Stars.
# Run from the repo root before merging anything to main (the live site).
#
#   ./_discovery/tools/check.sh                 # build + all structural checks
#   ./_discovery/tools/check.sh <baseline-ref>  # also diff rendered text vs that git ref
#
# Every check prints PASS/FAIL; the script exits non-zero if any check fails.
set -uo pipefail
cd "$(dirname "$0")/../.." || exit 1
REPO=$(pwd)
# pick a hugo that matches the version netlify pins, if we can find one
want_ver=$(grep -oP 'HUGO_VERSION\s*=\s*"\K[^"]+' netlify.toml 2>/dev/null || echo "")
HUGO=${HUGO:-}
if [ -z "$HUGO" ]; then
  for cand in "$HOME/go/bin/hugo" "$(command -v hugo 2>/dev/null)"; do
    [ -x "$cand" ] || continue
    v=$("$cand" version 2>/dev/null | grep -oP 'v\K[0-9.]+' | head -1)
    [ "$v" = "$want_ver" ] && { HUGO=$cand; break; }
    [ -z "$HUGO" ] && HUGO=$cand
  done
fi
HUGO=${HUGO:-hugo}
OUT=$(mktemp -d)
BASELINE=${1:-}
fails=0

step () { printf '\n\033[1m== %s\033[0m\n' "$1"; }
ok   () { echo "   PASS  $1"; }
bad  () { echo "   FAIL  $1"; fails=$((fails+1)); }

step "1. Hugo build (must match netlify.toml HUGO_VERSION)"
want=${want_ver:-?}
have=$("$HUGO" version 2>/dev/null | grep -oP 'v\K[0-9.]+' | head -1)
echo "   netlify pins $want / local hugo $have"
if [ "$want" != "$have" ]; then
  echo "   NOTE  local Hugo != pinned version. The theme needs >= 0.146; install the pinned"
  echo "         version and re-run, or trust Netlify's build instead of this one."
fi
if "$HUGO" --minify --destination "$OUT/site" --cleanDestinationDir >"$OUT/build.log" 2>&1; then
  ok "site builds ($(grep -oP 'Pages\s+│\s+\K[0-9]+' "$OUT/build.log" | head -1) pages)"
else
  bad "hugo build failed:"; tail -5 "$OUT/build.log"
fi

step "2. Snippet rules"
if python3 _discovery/tools/snippetlint.py; then ok "no snippet ends in an HTML comment"; else bad "see above"; fi

step "3. Broken internal links / anchors (on the BUILT site)"
if [ -d "$OUT/site" ] && python3 _discovery/tools/linkcheck.py "$OUT/site"; then
  ok "all internal links resolve"
else bad "broken links above"; fi

step "4. data/blocks.json + data/edges.json up to date"
if python3 _discovery/tools/builddata.py --check; then ok "canonical data matches content"; else bad "run: python3 _discovery/tools/builddata.py"; fi

step "5. PDF builder styles every construct the content uses"
if python3 _discovery/tools/buildercss.py "$OUT/site"; then ok "no unstyled constructs in the builder"; else bad "see above"; fi

if [ -n "$BASELINE" ]; then
  step "6. Rendered-text diff vs $BASELINE (no silent content loss)"
  wt="$OUT/baseline"
  if git worktree add -q --detach "$wt" "$BASELINE" 2>/dev/null; then
    rm -rf "$wt/themes/hugo-book"
    if "$HUGO" --minify --source "$wt" --themesDir "$REPO/themes" \
         --destination "$OUT/basesite" --cleanDestinationDir >"$OUT/basebuild.log" 2>&1; then
      python3 _discovery/tools/rendercheck.py "$OUT/basesite" "$OUT/site" > "$OUT/render.txt"
      tail -1 "$OUT/render.txt"
      lost=$(grep -oP 'TOTAL lost text segments: \K[0-9]+' "$OUT/render.txt")
      if [ "${lost:-0}" -eq 0 ]; then ok "nothing lost vs baseline"
      else
        echo "   REVIEW  $lost text segments differ — expected only for intentional edits:"
        grep '^===' "$OUT/render.txt" | sed 's/^/      /'
        echo "      full report: $OUT/render.txt"
      fi
    else bad "baseline build failed (see $OUT/basebuild.log)"; fi
    git worktree remove --force "$wt" 2>/dev/null
  else bad "could not create baseline worktree for $BASELINE"; fi
fi

step "Result"
if [ "$fails" -eq 0 ]; then
  echo "   ALL CHECKS PASSED — safe to merge"
  echo "   (build output kept at $OUT/site)"
  exit 0
else
  echo "   $fails CHECK(S) FAILED — do not merge to main until resolved"
  exit 1
fi
