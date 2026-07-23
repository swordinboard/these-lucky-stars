# Queue 5 — Granularity-ambiguous pages

Pages (or regions of pages) where coarse-vs-fine could not be decided without
guessing. Each entry states the two candidate splits and the tradeoff. The
inventory records a **provisional** choice for each (so downstream files have
IDs to point at), marked clearly — the human ruling here overrides it.

---

## 1. Combat action catalog (`combat/action-catalog`) — the big one
**Provisional:** one catalog block. **Alternative:** one block per named action
(Standard Attack, Disarm, Draw a Weapon, Shatter, Stand, Trip, Unarmed Attack,
Brace, Use Cover — Move/Step/Grapple/Stealth/Opportunity Attack are already
snippets included here).

- *Per-action (fine):* the builder's dream — a GM composes exactly the action
  set their table uses; tag-as-query gets `aggressive`/`defensive` sets; the
  already-snippeted actions prove the shape works. Cost: ~9 new one-to-three-line
  snippet files, and the catalog page becomes almost pure composition.
- *One catalog (coarse):* fewer files, and actions are arguably only meaningful
  as a set (Opportunity Attack rules reference aggressive/defensive
  classification defined in the catalog intro).
- **Lean:** fine, *if* the aggressive/defensive classification intro becomes its
  own small block the actions can reference (otherwise every action block
  inherits a Queue 2 problem). Decide together with Queue 2 items 6–7.

## 2. Basics "General Rules of Play" trio
**Provisional:** three fine blocks (`basics/contested-rolls`,
`basics/resolving-a-tie`, `basics/the-rounding-rule`). **Alternative:** one
"general rules of play" block.
- The three are 3–8 lines each; individually addressable is nice (tie-resolution
  is referenced from contested rolls) but three near-trivial files is real
  overhead. Resolving-a-Tie also half-depends on Contested Rolls.
- **Lean:** merge into one block unless the builder needs them separately.

## 3. Attributes: per-group vs per-attribute
**Provisional:** two blocks (`attributes/physical-attributes`,
`attributes/mental-attributes`). **Alternative:** eight blocks, one per
attribute.
- Per-attribute matches the "atomic selectable unit" ideal, but each is a
  two-line description that never gets referenced individually (the broken
  `#agility` links in vehicle-rules — Queue 3 — are the only attempts, and they
  point at *sections* of the page anyway). Eight micro-files for no current
  consumer.
- **Lean:** keep the two group blocks.

## 4. Grouped multi-item `details` (flagged `multi-item` in the inventory)
Three details blocks hold more than one item each:
- `generic-equipment/pouch-sets` — 3 items (Ammo / Small / Standard), each with
  its own anchor that other pages link to (`#pouch-set-ammo` is a Queue 1
  tag-adjacent target from Ballistic/Battery/Fuel Cell!).
- `generic-equipment/bandages` — 2 items (Large / Small).
- `components/signal-masts` — 2 components (Retractable / Heavy) with different
  slots, weights, and power draws.
**Tradeoff:** keep grouped (matches current visual presentation, one file) vs
split per item (each is independently selectable equipment; Signal Masts even
have different body slots). **Lean:** split all three — especially
`pouch-set-ammo`, which other rules depend on by name. Note the summary tables
already link per-item anchors.

## 5. Computer Systems (`sci-fi/computer-systems`)
**Provisional:** one block (networks + security levels + actions +
countermeasures). **Alternative:** sub-blocks (`system-level` chart,
`common-actions`, `security-countermeasures`).
- The subsections cross-reference each other's charts heavily (actions use the
  security-level base targets; countermeasures reference Bypass), so fine
  splitting manufactures hard dependencies. But as one block it's ~85 lines —
  the largest proposed extraction.
- **Lean:** keep as one block; it is genuinely one subsystem.

## 6. Mounts (`vehicles/mounts`)
**Provisional:** one block. **Alternative:** five (equipment-vs-allies, mount
features, unwilling mounts, mounts and impact/overrun, sudden stops).
- The five read as one continuous argument and the page is WIP (typos, likely
  restructuring). Splitting now means re-splitting after the page stabilizes.
- **Lean:** one block until the page exits WIP.

## 7. Wounds framework (`wounds/wounds`)
**Provisional:** one block (classification + dressing + minor + major +
narrative healing). **Alternative:** separate `minor-wounds` / `major-wounds`
blocks.
- Minor/major are parallel structures referenced as a pair everywhere
  ("dressed as if it were a new minor wound" inside major). Splitting creates
  mutual dependencies.
- **Lean:** one block.

## 8. Android race page features
**Provisional:** page-as-block (`races/android`). **Alternative:** split
features (Robot Chassis / Upgradable / Power Source / Dead Battery).
- All races are proposed page-as-block for consistency, but Android is 3× the
  size of the others and Dead Battery must leave the page anyway (Queue 2 #2).
  If Dead Battery is extracted, does the rest stay one block?
- **Lean:** page-as-block after Dead Battery extraction; revisit when the WIP
  banner comes off.

## 9. Inventory page
**Provisional:** two blocks (`inventory/carry-limits`, `inventory/body-slots`).
**Alternative:** page-as-block (it's a short, coherent page; two blocks means
extraction, page-as-block means zero new files).
- **Lean:** page-as-block is defensible; two blocks only pays off if the
  builder wants body-slot rules without encumbrance (plausible for the
  components/bots audience). Genuinely 50/50 — hence queued.
