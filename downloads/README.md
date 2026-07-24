# OpenSat Mission Lab

**OpenSat Mission Lab** is an open-source CubeSat mission digital twin designed to run on a home PC. It connects mission configuration, astrodynamics, Earth-fixed geometry, eclipse and ground-contact analysis, Earth-observation payload operations, electrical-power simulation, attitude determination and control, RF communications, adaptive-rate data downlink, verification, and engineering reports.

Author: **SAMUELSON G**

## Current release: v3.1.0

v3.0 adds policy-governed autonomous mission orchestration. It connects analysis outputs to replayable workflow DAGs with human approval gates, stable idempotency keys, bounded retries, compensation actions, and hash-chained operational evidence.

New v3.0 capabilities:

- Dependency-validated flood-response workflow DAG
- Human approval and rejection paths for high-risk actions
- Stable workflow and task idempotency keys
- Duplicate-trigger suppression
- Bounded retries for transient failures
- Durable pause and resume after scheduler outages
- Safe compensation after rejected partial workflows
- SHA-256 hash-chained event history
- Deterministic event replay and terminal-state verification
- Interactive orchestration dashboard and Prometheus evidence

The demonstration runs three workflows: one completes after a command retry, one is rejected and compensated safely, and one pauses during a scheduler outage before resuming from durable history.

## Quick start in VS Code

1. Open `OpenSat-Mission-Lab.code-workspace`.
2. Install the recommended extensions.
3. Open **Terminal → New Terminal**.
4. Run the setup script.

Windows PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup_windows.ps1
```

Linux or macOS:

```bash
chmod +x scripts/setup_unix.sh
./scripts/setup_unix.sh
```

After setup, open **Run and Debug**, select **OpenSat: Run v3.0 policy-governed orchestration**, and press `F5`.

## Repair a stale Windows environment

The project does not depend on pandas. If imports stall after upgrading Python or reusing an old `.venv`, close active terminals and run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\repair_windows.ps1
```

Then select `.venv\Scripts\python.exe` through **Python: Select Interpreter**.

## Manual commands

```bash
python -m venv .venv

# Linux/macOS
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
python -m pip install -e ".[dev,services,cloud]"

# Run the current policy-governed mission orchestration
opensat-v30-demo --output outputs/v3.0
python -m pytest -q
python -m opensatlab.cli run configs/india_flood_monitoring.yaml --output outputs/demo
python -m opensatlab.cli accept configs/india_flood_monitoring.yaml --output outputs/acceptance
python -m opensatlab.cli constellation configs/india_flood_monitoring.yaml --output outputs/constellation
python -m opensatlab.cli autonomy configs/india_flood_monitoring_fast_acceptance.yaml --output outputs/autonomy
python -m opensatlab.cli earth-observation-demo --scene examples/earth_observation/demo_scene.tif --output outputs/earth-observation
python -m opensatlab.cli temporal-demo --dataset examples/temporal_observation --output outputs/temporal-fusion
python -m opensatlab.cli timeseries-demo --dataset examples/timeseries_observation --output outputs/timeseries
python -m opensatlab.cli datacube-demo --workspace examples/timeseries_observation --output outputs/datacube
python -m opensatlab.cli datacube-query --database outputs/datacube/opensat_datacube.sqlite --after 2026-07-09
opensat-governance-demo --workspace examples/timeseries_observation --output outputs/services
opensat-security-demo --workspace examples/timeseries_observation --output outputs/services
opensat-observability-demo --output outputs/observability
opensat-v27-demo --output outputs/v2.7
opensat-v28-demo --output outputs/v2.8
opensat-api --database outputs/services/datacube/opensat_datacube.sqlite --output-root outputs/services --host 127.0.0.1 --port 8080
opensat-worker --database outputs/services/datacube/opensat_datacube.sqlite --once
python -m opensatlab.cli dashboard outputs/demo
python -m opensatlab.cli compare-external outputs/demo/independent_primary_state_history.csv outputs/demo/independent_reference_state_history.csv --output outputs/external
# In terminal 1:
python -m opensatlab.cli hil-listen --host 127.0.0.1 --port 5010 --expected-packets 20
# In terminal 2:
python -m opensatlab.cli hil-replay outputs/demo/telemetry_packets.csv --host 127.0.0.1 --port 5010 --rate-hz 20 --max-packets 20
```

The dashboard command opens the generated dashboard at `http://127.0.0.1:8765/mission_control_dashboard.html`. You may also open `outputs/demo/mission_control_dashboard.html` directly in a browser.

## Generated demonstration files

```text
outputs/demo/
├── adaptive_data_rate.png
├── attitude_history.csv
├── attitude_modes.png
├── body_rates.png
├── battery_state_of_charge.png
├── camera_footprint.csv
├── camera_footprint_geometry.png
├── contact_windows.csv
├── downlink_history.csv
├── downlink_passes.csv
├── dynamics_model_comparison.csv
├── dynamics_model_comparison.png
├── command_log.csv
├── fault_injections.csv
├── fault_timeline.png
├── flight_software_event_log.csv
├── flight_software_history.csv
├── flight_software_safe_mode_windows.csv
├── flight_software_states.png
├── eclipse_windows.csv
├── ground_track.png
├── imaging_events.csv
├── imaging_opportunities.csv
├── imaging_timeline.png
├── autonomy_scene_assessments.csv
├── autonomy_target_priorities.csv
├── autonomous_tasking_schedule.csv
├── earth_observation_dashboard.html
├── earth_observation_summary.txt
├── ground_truth_validation.png
├── model_evaluation.csv
├── scene_metadata.json
├── spectral_index_statistics.csv
├── spectral_products.png
├── threshold_evaluation.png
├── threshold_metrics.csv
├── tile_metrics.csv
├── onboard_event_scores.png
├── onboard_decision_timeline.png
├── autonomous_target_priorities.png
├── edge_inference_resource_trade.png
├── onboard_autonomy_dashboard.html
├── link_budget_history.csv
├── link_margin.png
├── alarm_log.csv
├── command_plan.csv
├── mission_control_dashboard.html
├── mission_control_data.json
├── mission_control_preview.png
├── mission_summary.txt
├── operations_schedule.csv
├── pass_schedule.csv
├── operating_modes.png
├── momentum_dump_windows.csv
├── payload_data_transfer.png
├── payload_storage.csv
├── payload_storage.png
├── power_balance.png
├── power_history.csv
├── pointing_error.png
├── pointing_violation_windows.csv
├── reaction_wheel_momentum.png
├── revisit_analysis.csv
├── safe_mode_windows.csv
├── state_history.csv
├── sunlight_timeline.png
├── target_access_windows.csv
├── target_coverage.png
├── target_coverage_india.png
├── telemetry_delivery.png
├── telemetry_packets.csv
├── watchdog_resets.csv
├── watchdog_timeline.png
├── visibility_bengaluru.png
├── analytical_benchmarks.csv
├── benchmark_comparison.png
├── output_manifest.json
├── requirements_status.png
├── requirements_traceability.csv
├── verification_badge.svg
├── verification_report.html
├── verification_results.csv
├── constellation_dashboard.html
├── constellation_ground_tracks.png
├── constellation_network_history.csv
├── constellation_revisit_analysis.csv
├── constellation_state_history.csv
├── coordinated_imaging_schedule.csv
├── inter_satellite_link_windows.csv
├── shared_ground_pass_schedule.csv
└── verification_summary.txt
```

## Example attitude configuration

```yaml
attitude:
  inertia_kg_m2: [0.08, 0.10, 0.06]
  initial_body_rate_deg_s: [1.2, -0.8, 0.6]
  detumble_rate_threshold_deg_s: 0.08
  controller_kp_nm_per_rad: 0.008
  controller_kd_nms_per_rad: 0.045
  max_reaction_wheel_torque_mnm: 4.0
  max_reaction_wheel_momentum_mnms: 25.0
  target_slew_lead_seconds: 300.0
  downlink_slew_lead_seconds: 180.0
  imaging_pointing_requirement_deg: 1.0
```

## Attitude-control logic

The spacecraft first magnetically detumbles. It then commands nadir pointing during nominal operations, target tracking before and during imaging, ground-station pointing before contacts, and Sun pointing in safe mode. Noisy sensor estimates feed a bounded three-axis reaction-wheel controller. Persistent disturbance torque accumulates wheel momentum; a simplified magnetic unloading model reduces it before saturation. Captures that exceed the imaging pointing requirement are marked `attitude_blocked`.

## Example flight-software configuration

```yaml
flight_software:
  watchdog_timeout_seconds: 180.0
  reboot_duration_seconds: 120.0
  recovery_hold_seconds: 900.0
  telemetry_period_seconds: 300.0
  command_authorization_token: DEMO-OPS-2026
  scheduled_commands:
    - elapsed_seconds: 359400
      command: SET_PAYLOAD_STANDBY
      authorization: DEMO-OPS-2026
  fault_injections:
    - elapsed_seconds: 129600
      fault_type: processor_hang
      duration_seconds: 900
      severity: critical
```

## Flight-software logic

The supervisor follows boot, initialization, detumble, nominal, imaging, downlink, safe-mode, and reboot states. Time-tagged commands are authenticated and acknowledged. A missing heartbeat increments the watchdog; reaching the timeout causes an autonomous reset and recovery hold. Sensor faults request safe mode, telemetry-bus faults create packet gaps, and command-bus faults reject commands. Housekeeping packets use deterministic JSON payloads and CRC-32 checksums.

## Example communications configuration

```yaml
communications:
  frequency_mhz: 2200.0
  transmit_power_w: 2.0
  spacecraft_antenna_gain_dbi: 2.0
  ground_antenna_gain_dbi: 18.0
  transmit_losses_db: 1.0
  atmospheric_loss_db: 1.5
  pointing_loss_db: 1.0
  system_noise_temperature_k: 500.0
  required_eb_n0_db: 7.0
  minimum_link_margin_db: 3.0
  supported_data_rates_kbps: [9.6, 38.4, 115.2, 256.0, 512.0]
  protocol_efficiency: 0.82
```

## Communications logic

At every simulation sample, the software:

1. Computes station elevation and slant range.
2. Rejects samples below the station minimum elevation.
3. Calculates free-space path loss, C/N₀, and Eb/N₀ margin.
4. Selects the highest configured rate meeting the minimum margin.
5. Requires the power system to be in effective `downlink` mode.
6. Selects the visible station with the best available rate.
7. Applies protocol efficiency to the sample transfer capacity.
8. Removes only successfully transmitted data from onboard storage.
9. Prevents storage from becoming negative.
10. Aggregates results into pass-by-pass reports and mission plots.

## Mission-control workflow

The simulation creates operator-facing products after all spacecraft and flight-software models complete:

1. Alarm rules consolidate power, ADCS, storage, communications, injected faults, and watchdog events.
2. The pass scheduler scores each ground contact and assigns an operator action.
3. The command planner merges configured commands with recommended post-reset or post-fault checks.
4. The operations schedule combines contacts, imaging, eclipses, safe modes, faults, and commands.
5. A self-contained HTML dashboard embeds downsampled telemetry and all planning tables.
6. `opensatlab dashboard outputs/demo` serves the files locally using Python's standard library.

The command console is deliberately planning-only. Browser-entered commands are exported to JSON and are not transmitted to hardware or written into the mission configuration.

## Repository architecture

```text
configs/                         Mission, orbit, payload, power, communications, target, and station inputs
src/opensatlab/mission/          Configuration loading and validation
src/opensatlab/orbit/            State conversion, propagation, and coordinates
src/opensatlab/environment/      Sun direction and eclipse modelling
src/opensatlab/ground/           Station geometry and event-window analysis
src/opensatlab/payload/          Footprint, access, scheduling, and image generation
src/opensatlab/power/            Solar, battery, loads, and safe-mode logic
src/opensatlab/communications/   RF link budget, adaptive rate, downlink, and storage
src/opensatlab/attitude/         References, sensors, detumbling, wheels, and pointing
src/opensatlab/flight_software/  State machine, commands, telemetry, watchdog, and recovery
src/opensatlab/mission_control/   Alarms, scheduling, command plans, dashboard, and local server
src/opensatlab/reporting/        CSV tables, summaries, and plots
src/opensatlab/verification/     Traceability, benchmarks, acceptance, and manifests
tests/                           Automated verification tests
docs/                            Requirements, validation, assumptions
outputs/                         Generated simulation results
```

## Development roadmap

| Release | Goal | Status |
|---|---|---|
| v0.1 | Two-body orbit and ground track | Complete |
| v0.2 | J2 perturbation, eclipse detection, station passes | Complete |
| v0.3 | Target coverage, footprint, revisit, payload imaging | Complete |
| v0.4 | Electrical power, battery SOC, and safe mode | Complete |
| v0.5 | Communications link budget and data downlink | Complete |
| v0.6 | Attitude modes and pointing | Complete |
| v0.7 | Flight-software state machine and telemetry | Complete |
| v0.8 | Mission-control dashboard and scheduler | Complete |
| v0.9 | FMEA, fault tree, Monte Carlo, risk register, and anomaly detection | Complete |
| v1.0 | Traceability, benchmarks, acceptance report, manifest, CI, and portfolio package | Complete |
| v1.1 | Independent cross-validation, external-tool interchange, and UDP HIL telemetry | Complete |
| v1.2 | USB/UART bridge, command acknowledgements, Raspberry Pi gateway, and ESP32 endpoint | Complete |
| v1.3 | Multi-satellite constellation, crosslinks, shared ground scheduling, and distributed operations | Complete |
| v1.4 | Conjunction screening, maneuver trades, optimized tasking, and autonomous replanning | Complete |
| v1.5 | Explainable onboard scene intelligence, resource-aware decisions, and target reprioritization | Complete |
| v1.6 | Calibrated multispectral imagery, open-data ingestion, tiling, spectral indices, and validation | Complete |
| v1.7 | Multi-date co-registration, flood progression, and optical/SAR fusion | Complete |


## v1.5 onboard-autonomy workflow

```bash
opensatlab autonomy configs/india_flood_monitoring_fast_acceptance.yaml --output outputs/autonomy
opensatlab dashboard outputs/autonomy --port 8772 --page onboard_autonomy_dashboard.html
```

The scene features and flood-event scores are deterministic, explainable surrogates designed to exercise software architecture and operations logic. They are not trained against satellite imagery and must not be used as flood alerts. See `ONBOARD_AUTONOMY_GUIDE.md`.

## v1.4 conjunction safety workflow

```bash
opensatlab safety configs/india_flood_monitoring.yaml --output outputs/safety
opensatlab dashboard outputs/safety --port 8771 --page constellation_safety_dashboard.html
```

The bundled catalogue and probability values are deterministic educational surrogates. They are not authoritative tracking data, conjunction data messages, or operational collision probabilities. See `SAFETY_AND_REPLANNING_GUIDE.md`.

## Independent validation workflow

The v1.1 acceptance run creates a six-hour two-body cross-check. The primary fixed-step RK4 result is compared sample-by-sample with an independently implemented universal-variable Lagrange f/g propagator. The release also writes `external_validation_request.json`, a blank compatible CSV template, a GMAT starter script, and an Orekit request file.

To compare a real export from an external tool:

```bash
opensatlab compare-external primary_state_history.csv external_reference.csv --output outputs/external
```

The files must share the documented inertial Cartesian columns and elapsed-time grid. This workflow is software cross-validation, not agency certification.

## Home-lab telemetry workflow

`OSML-HIL/1` sends one JSON telemetry frame per UDP datagram. Each frame contains the APID, sequence number, payload, and a CRC-32 over canonical payload bytes. The acceptance run sends 50 packets through localhost and verifies complete delivery, order, and CRC integrity.

A second PC or Raspberry Pi can listen with:

```bash
opensatlab hil-listen --host 0.0.0.0 --port 5010 --output outputs/hil_capture.ndjson
```

Replay generated spacecraft telemetry from the simulation computer with:

```bash
opensatlab hil-replay outputs/demo/telemetry_packets.csv --host RECEIVER_IP --port 5010 --rate-hz 20
```

This validates software framing and transport only. It does not qualify serial electronics, real-time deadlines, electromagnetic compatibility, or flight hardware.

## Engineering limitations

OpenSat Mission Lab is educational preliminary-design software, not flight-qualified software. v1.1 uses fixed-step RK4 integration, first-order J2, a low-accuracy solar-direction approximation, a cylindrical shadow, spherical optical geometry, sampled event boundaries, constant RF gains and losses, a fixed system noise temperature, a discrete adaptive-rate table, constant protocol efficiency, a constant solar-incidence factor, and a lumped battery model. The flight-software layer is deterministic and sampled; it is not an RTOS and does not provide cryptographic authentication, redundant computers, hardware drivers, CCSDS compliance, radiation modelling, or formal verification. The browser dashboard uses sampled telemetry, heuristic alarm thresholds, a static planning database, and a planning-only command console; it is not a secure mission-control system. It also does not model antenna patterns, Doppler tracking, modulation-specific coding curves, rain fading, interference, retransmission protocols, regulatory coordination, high-fidelity magnetic fields, flexible-body dynamics, wheel jitter, terrain, calibrated optics, component failure-rate databases, radiation transport, correlated uncertainty distributions, formal probabilistic risk assessment, certification evidence, or hardware qualification.

## Contributing

See `CONTRIBUTING.md`. Contributions can begin with documentation, validation cases, model improvements, plots, tests, or issues labelled `good first issue`.

## v1.3 constellation configuration

```yaml
constellation:
  enabled: true
  name: OpenSat India Flood Watch Constellation
  satellite_count: 4
  planes: 2
  phasing: 1
  inter_satellite_link_range_km: 5000.0
  inter_satellite_data_rate_kbps: 1024.0
  duplicate_suppression_seconds: 3600.0
  shared_ground_channels_per_station: 1
```

Run only the constellation layer with:

```powershell
opensatlab constellation configs/india_flood_monitoring.yaml --output outputs\constellation
```

Open `outputs/constellation/constellation_dashboard.html` directly or serve it through the dashboard command. The constellation analysis is a preliminary educational model; it does not include spectrum licensing, collision-avoidance operations, or flight-certified routing.

## License and citation

Code is released under the MIT License. Citation metadata is provided in `CITATION.cff`.


## Reliability workflow

The v1.1 analysis runs after the deterministic mission simulation:

1. The FMEA ranks power, ADCS, flight-software, communications, payload, operations, and environment failure modes.
2. Existing controls are credited separately from recommended future mitigations.
3. A seeded surrogate Monte Carlo campaign perturbs solar performance, initial SOC, cloud probability, link performance, attitude disturbance, and representative faults.
4. Mission success is evaluated against configurable imagery, energy, telemetry, storage, and control criteria.
5. Mutually exclusive trial outcomes populate an educational mission-failure fault tree.
6. Engineering limits and robust statistical checks produce consolidated anomaly windows.
7. CSV, JSON, text, plots, and a self-contained HTML reliability dashboard are generated.

Example configuration:

```yaml
reliability:
  monte_carlo_trials: 1000
  random_seed: 2026
  mission_success_min_images: 5
  mission_success_min_telemetry_percent: 95.0
  mission_success_min_soc_percent: 20.0
  anomaly_robust_z_threshold: 5.0
  anomaly_minimum_duration_samples: 2
```

The Monte Carlo layer is explicitly a preliminary surrogate uncertainty model around the deterministic baseline. It is not a substitute for component failure-rate data, radiation analysis, qualification testing, or formal probabilistic risk assessment.

## External-tool comparison

Version 1.1.1 includes ready-to-run adapters for GMAT and Orekit.

```powershell
# Orekit: requires JDK 17+; Maven is supplied by the project wrapper
.\scripts\run_orekit_comparison.ps1 -VerboseMaven -Clean

# GMAT: pass the installed GMATConsole executable
.\scripts\run_gmat_comparison.ps1 -GMATConsole "C:\path\to\GMATConsole.exe"
```

The workflow normalizes the external Cartesian state history, checks the time grid, calculates position and velocity differences, applies acceptance tolerances, and generates an HTML report and plot under `outputs/external-comparison/`.


## v1.6 calibrated Earth-observation workflow

Run the bundled offline validation:

```powershell
opensatlab earth-observation-demo `
  --scene examples\earth_observation\demo_scene.tif `
  --output outputs\earth-observation
```

Query open Sentinel-2 candidates:

```powershell
opensatlab earth-search `
  --bbox 77.35 12.80 77.85 13.30 `
  --datetime 2026-01-01/2026-06-30 `
  --cloud-cover-max 15 `
  --output outputs\earth-observation\stac_manifest.csv
```

Download one candidate subset and run the analysis:

```powershell
opensatlab earth-search-download `
  --bbox 77.35 12.80 77.85 13.30 `
  --datetime 2026-01-01/2026-06-30 `
  --cloud-cover-max 15 `
  --scene outputs\earth-observation\sentinel2_scene.tif `
  --output outputs\earth-observation\sentinel2-analysis
```

See `docs/earth_observation.md` for band conventions, calibration, reference-mask limitations, and reproducibility notes.


## v1.7 temporal optical/SAR workflow

Run the bundled offline demonstration:

```powershell
opensatlab temporal-demo `
  --dataset examples\temporal_observation `
  --output outputs\temporal-fusion
```

Serve the interactive report:

```powershell
opensatlab dashboard `
  outputs\temporal-fusion `
  --port 8774 `
  --page temporal_fusion_dashboard.html
```

See `docs/temporal_fusion.md` for input schemas, registration assumptions, validation metrics, and limitations.


## v1.8 flood time series

```powershell
opensatlab timeseries-demo --dataset examples\timeseries_observation --output outputs\timeseries
```

## v2.4 zero-trust validation

Run the external-PDP, workload-identity, managed-KMS, RLS-harness, and attack-regression demonstration:

```powershell
opensat-zero-trust-demo --workspace examples\timeseries_observation --output outputs\services
```

Open `outputs/services/zero_trust_validation_dashboard.html`. See `ZERO_TRUST_SECURITY_GUIDE.md` for deployment settings and security boundaries.

## v3.1 safety-assured orchestration

```powershell
opensat-v31-demo --output outputs/v3.1
```

The v3.1 layer adds Ed25519 approval signatures, separation of duties, time-bounded command grants, deterministic workflow migration, and exhaustive command-gate safety invariants. See `ORCHESTRATION_SAFETY_ASSURANCE_GUIDE.md`.
