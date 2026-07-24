# Portfolio Case Study — OpenSat Mission Lab

## Project summary

**OpenSat Mission Lab** is a home-PC CubeSat mission digital twin created by **SAMUELSON G**. It links mission design, astrodynamics, environmental geometry, payload scheduling, power, communications, attitude control, flight software, mission operations, reliability analysis, and formal verification in one reproducible Python project.

## Problem

Space portfolios often demonstrate only one isolated skill: orbit plotting, satellite tracking, image processing, or a dashboard. Real missions require subsystem interactions and evidence that requirements are satisfied. This project demonstrates those interactions through a seven-day 6U Earth-observation scenario.

## Engineering contribution

- Designed a modular Python architecture with subsystem boundaries and configuration-driven behavior.
- Implemented two-body and J2 orbit propagation, eclipse calculations, WGS-84 station access, and target visibility.
- Modelled payload scheduling, battery energy, adaptive S-band downlink, quaternion ADCS, supervisory flight software, and ground operations.
- Added fault injection, watchdog recovery, FMEA, Monte Carlo uncertainty, anomaly detection, and operator dashboards.
- Built requirement traceability, analytical benchmarks, release manifests, automated tests, CI, and acceptance reporting.

## Evidence

The baseline release generates 10,081 mission samples, multiple engineering CSV files and figures, two interactive dashboards, a reliability package, and an HTML verification report. The exact result set is hashed in `output_manifest.json`.

## Skills demonstrated

Systems engineering, mission analysis, orbital mechanics, remote sensing, EPS, RF link budgets, ADCS, flight software, telemetry, ground systems, reliability engineering, data visualization, Python packaging, automated testing, CI/CD, technical writing, and open-source governance.

## Important scope statement

The software is educational and suitable for preliminary analysis and portfolio demonstration. It is not flight-qualified, independently validated, cyber-hardened, licensed for spectrum use, or approved to command real hardware.

## v1.1 validation and home-lab extension

The v1.1 release adds two portfolio demonstrations beyond the software-only digital twin:

1. **Independent orbit cross-validation:** the RK4 two-body implementation is compared with a separately implemented universal-variable propagator over six hours. The release exports aligned primary and reference state histories, error metrics, external-tool interchange files, and an HTML report.
2. **Hardware-in-the-loop telemetry path:** generated housekeeping packets are framed as CRC-protected `OSML-HIL/1` UDP datagrams. A 50-packet loopback acceptance test verifies delivery and order, while listener/replay commands support a second PC or Raspberry Pi.

These additions demonstrate numerical-method validation, interface definition, packet integrity, network test automation, and clear separation between educational evidence and real flight qualification.

## v1.2 physical home-lab bridge

The v1.3 release adds bidirectional command and telemetry protocols, optional USB/UART transport, an executable Raspberry Pi gateway, and ESP32 firmware. This demonstrates systems integration across simulation software, networking, serial drivers, embedded firmware, operator commands, packet integrity, and verification evidence.


## v1.3 constellation and distributed operations

The v1.3 release extends the baseline spacecraft into a four-satellite Walker-style demonstration. It propagates all vehicles on a common grid, coordinates target collection, suppresses duplicate observations, calculates Earth-occultation-aware crosslinks, builds the sampled network graph, and schedules one shared ground-station channel. The seven-day scenario produces 35 coordinated images, 848 sampled crosslink windows, up to 3.95× better worst-case revisit, and up to 2.33× higher observation rate.

This layer demonstrates constellation design, distributed scheduling, inter-satellite networking, shared-resource operations, network analysis, and clear separation between preliminary mission analysis and flight-qualified operations.


## v1.4 space-safety and autonomy layer

The v1.4 release demonstrates conjunction-screening software architecture without claiming operational space-traffic-management capability. A deterministic six-object relative-motion catalogue is screened against all protected constellation spacecraft. High-risk events feed a maneuver trade study, recommended burns create tasking blackout windows, and the constellation scheduler regenerates a conflict-checked plan. A second disruption scenario removes one spacecraft temporarily and escalates a flood target, demonstrating autonomous schedule replanning with traceable decisions.

This layer showcases space-situational-awareness concepts, collision-risk triage, maneuver trade analysis, constrained optimization, autonomous operations, safety boundaries, and verification-driven engineering.

## v1.5 onboard autonomy and edge intelligence

The v1.5 release adds a transparent onboard decision layer. Coordinated observations receive deterministic synthetic scene features, an explainable event probability, image-quality scores, and resource context. The software selects downlink and retention actions, updates target priorities, and generates a conflict-checked autonomous plan. Every model contribution is exported so reviewers can inspect why a decision was made. The project explicitly avoids claiming a trained flood model or flight-qualified autonomy.


## v1.6 calibrated Earth-observation validation

The v1.6 release connects the mission digital twin to geospatial raster engineering. It ingests calibrated multispectral GeoTIFFs, standardizes mixed-resolution Sentinel-2 assets, generates overlapping tiles, calculates NDWI, MNDWI, NDVI, and brightness, evaluates an explainable flood baseline against a reference mask, and produces confusion-matrix and threshold-sensitivity evidence. A public STAC adapter searches Earth Search and can build a common-grid Sentinel-2 subset. This demonstrates remote-sensing data engineering, reproducibility, geospatial validation, and careful separation between a software baseline and an operational disaster product.

## v1.9 portfolio evidence: operational data management

The v1.9 layer demonstrates that the project is not limited to isolated
notebooks or one-off plots. It indexes raster assets in SQLite, records SHA-256
integrity and provenance, suppresses duplicate work through content
fingerprints, emits processing events, exports STAC-like records, and exposes a
searchable operational dashboard. The bundled demonstration indexes six scenes
and completes one event-triggered time-series job without duplicate work on a
second scan.


## v2.1 platform-hardening extension

The project now demonstrates operational platform engineering in addition to mission analysis: GDAL-backed Cloud Optimized GeoTIFF publishing, S3-compatible storage, expiring worker leases, HMAC-signed webhooks, role-based API access, and verified backup/recovery. The bundled validation proves these controls with a local object store and a real localhost webhook receiver.


## v2.3 security-platform evidence

The repository now demonstrates PostgreSQL RLS policy design, transaction-bound tenant context, secret-key rotation, service workload credentials, policy-as-code decisions, signed audit export, and multi-region recovery evidence.

## v3.1 safety assurance

The orchestration layer now demonstrates detached Ed25519 approval signatures, two-person separation of duties, time-bounded and digest-bound command grants, deterministic workflow migration, and exhaustive validation of 256 command-gate states.
