# Five-Minute Portfolio Demo Script

## 0:00–0:30 — Introduce the mission

“OpenSat Mission Lab is an end-to-end 6U CubeSat digital twin that I built to demonstrate space systems engineering on a home PC. The baseline mission monitors flood-prone regions in India for seven simulated days.”

## 0:30–1:15 — Show configuration and architecture

Open `configs/india_flood_monitoring.yaml`, then `docs/architecture.md`. Explain that a single configuration drives the orbit, payload, power, communications, ADCS, flight software, reliability campaign, and ground segment.

## 1:15–2:00 — Run the acceptance command

Run:

```powershell
.\.venv\Scripts\python.exe -m opensatlab.cli accept configs/india_flood_monitoring.yaml --output outputs/acceptance
```

Point out that the command produces a nonzero exit code if a requirement or analytical benchmark fails.

## 2:00–3:00 — Mission-control dashboard

Open `outputs/acceptance/mission_control_dashboard.html`. Demonstrate battery SOC, telemetry, alarm search, pass prioritization, the operations timeline, and the planning-only command console.

## 3:00–3:45 — Reliability dashboard

Open `outputs/acceptance/reliability_dashboard.html`. Show the FMEA, risk matrix, Monte Carlo outcome distribution, anomaly timeline, and fault tree. Explain that the uncertainty model is deliberately documented as a preliminary surrogate.

## 3:45–4:30 — Verification evidence

Open `outputs/acceptance/verification_report.html`. Show requirement status, analytical benchmark margins, traceability rows, and the PASS status. Open `output_manifest.json` to show SHA-256 hashes for reproducibility.

## 4:30–5:00 — Close

“This project shows not only simulation code, but also requirements, verification, operations, risk, documentation, tests, and CI. It is an open-source educational digital twin—not flight software—but it demonstrates how I approach complete space-system problems.”

## v1.1 add-on demonstration — 90 seconds

Open `external_validation_report.html`. Explain that the main propagator uses fixed-step RK4, while the reference uses universal variables and Lagrange f/g coefficients. Point to the six-hour maximum position and velocity errors, then show the GMAT starter script and Orekit request JSON as interfaces for a future independently installed tool.

Next open `hil_validation_report.html`. Show the 50 sent and 50 received UDP datagrams, zero invalid frames, and matching packet order. In two terminals, start `hil-listen` and then `hil-replay` to demonstrate telemetry transfer to another local process. Emphasize that the interface is suitable for a Raspberry Pi or serial gateway but is not flight-hardware qualification.


## v1.3 constellation add-on — 90 seconds

Run:

```powershell
opensatlab constellation configs/india_flood_monitoring.yaml --output outputs\constellation
```

Open `constellation_dashboard.html`. Show the four spacecraft orbital slots, first-day ground tracks, coordinated imaging schedule, worst-case revisit comparison, hourly crosslink availability, and shared Bengaluru station schedule. Explain that the scheduler suppresses near-duplicate observations and that the crosslink model rejects paths blocked by Earth. Finish by opening `constellation_summary.txt` and highlighting the 3.95× worst-case revisit improvement and 2.33× observation-rate increase.


## v1.4 safety and replanning add-on — 90 seconds

Run:

```powershell
opensatlab safety configs/india_flood_monitoring.yaml --output outputs\safety
```

Open `constellation_safety_dashboard.html`. Show the conjunction risk space, two high/critical events, maneuver recommendations, and task-utility comparison. Then open `replanning_events.csv` and `replanned_tasking_schedule.csv` to explain how an eight-hour spacecraft outage and flood-priority escalation regenerate the plan. End with the scope warning: the catalogue and probability values are deterministic educational proxies, not operational collision-avoidance products.

## v1.5 onboard autonomy add-on — 90 seconds

Open `onboard_autonomy_dashboard.html`. Show the flood probability, quality, battery state, and selected action for one image. Open `autonomy_scene_assessments.csv` and point out the separate water, change, cloud, quality, and priority contributions. Then show `autonomous_target_priorities.png` and `autonomous_tasking_schedule.csv` to demonstrate how onboard evidence can influence later mission planning while retaining traceable decisions and explicit safety boundaries.


## v1.6 Earth-observation add-on — 90 seconds

Run `opensatlab earth-observation-demo --output outputs\earth-observation`. Open `earth_observation_dashboard.html` and show the calibrated true-colour scene, MNDWI and NDVI products, flood-probability raster, reference mask, and error map. Open `model_evaluation.csv` and `threshold_metrics.csv` to explain accuracy, F1, IoU, and threshold selection. Finish by showing the `earth-search` and `earth-search-download` commands, while noting that Sentinel-2 SCL water is only a weak reference and not independent flood ground truth.

## v1.9 data-cube segment — 90 seconds

1. Run `opensatlab datacube-demo --workspace examples/timeseries_observation --output outputs/datacube`.
2. Open `datacube_dashboard.html` and show the six indexed scenes.
3. Open `scene_catalog.csv` to point out acquisition time, CRS, bounds, bands, size, and SHA-256 fields.
4. Open `processing_jobs.csv` and explain the content fingerprint that prevents duplicate processing.
5. Run the same command again with `--keep-database`; highlight zero new scenes and no duplicate job.
6. Run a date query with `opensatlab datacube-query --database outputs/datacube/opensat_datacube.sqlite --after 2026-07-09`.


## v2.1 platform demonstration

1. Run `opensatlab service-demo --workspace examples/timeseries_observation --output outputs/services`.
2. Open `outputs/services/platform_validation_dashboard.html`.
3. Show the COG object under `outputs/services/object-store/cogs/`.
4. Explain viewer/operator/admin API roles.
5. Show the leased job fields, signed webhook evidence, and restored SQLite database.
6. Finish with the Docker Compose architecture: PostGIS, MinIO, API, leased workers, and Prometheus.


## v2.3 security demonstration

Run `opensat-security-demo`, show the 48/48 dashboard, inspect the RLS SQL, revoke a service credential, verify the signed audit bundle, and open the multi-region recovery evidence.

## v3.1 safety-assurance demonstration

1. Run `opensat-v31-demo --output outputs/v3.1`.
2. Open `v31_safety_assurance_dashboard.html`.
3. Show the ten verified signatures and three blocked approval attacks.
4. Explain the authorization-window plot and the five blocked command attempts.
5. Show the migration evidence and the 256-state invariant check with zero violations.
