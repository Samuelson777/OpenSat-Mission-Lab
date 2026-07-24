# OpenSat Mission Lab v3.1 — Orchestration Safety Assurance

## Purpose

v3.1 extends the v3.0 workflow simulator with cryptographic approval evidence, two-person separation of duties, time-bounded command grants, deterministic workflow-version migration, and exhaustive finite-state safety checks.

## Approval signatures

Approval payloads are serialized canonically, hashed with SHA-256, and signed using Ed25519. Public signing identities are exported; private keys and deterministic test seeds are never written to evidence files.

Two distinct signers are required:

- command-plan gate: mission director + safety officer;
- product-publication gate: product owner + quality officer.

The requester cannot sign their own approval request. Duplicate actors, duplicate roles, altered payloads, and unknown signing keys are blocked.

## Command authorization

A command grant is bound to:

- one workflow ID;
- one command name;
- one SHA-256 command-and-parameter digest;
- two signed approval record IDs;
- a `not_before` time;
- an expiry time no more than five minutes later.

The command gate also checks conjunction blackout state and spacecraft power safety. Expired grants are not renewed or extended in place.

## Workflow migration

The deterministic v3.0 → v3.1 migration inserts an `authorize` node before pending command work. Workflow IDs, idempotency keys, completed nodes, status, and terminal state are preserved. Completed or compensated workflows do not acquire unnecessary pending authorization work.

## Safety invariants

The demonstration enumerates all 256 Boolean combinations of eight command-gate conditions. Only the state satisfying every condition may transmit. Eight invariants are checked with zero violations.

This is exhaustive finite-state validation of the educational gate model. It is not a proof of a real spacecraft flight system, formal certification, or authorization to transmit operational commands.
