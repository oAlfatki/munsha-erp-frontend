# Baseline and migration contract

Old: feature api → resource descriptors → useFeatureResources/useQueries → mergeResources → FeatureDataScope → useErpContext → UI/ReportViewer.

Target: feature typed API → parameter-aware screen Query → minimal feature read-model → screen/form/presentation. App composes shell metadata and authorized session. Shared report viewer receives rows/columns/filters, never ERP state. Domain computations consume explicit narrow contracts.

Baseline evidence: 41 command HTTP examples, 192 report cases, 40 pure function snapshots, DTO field snapshots, visible page snapshots and tests/reference. These protect behavior, not legacy architecture. Unknown backend guarantees stay unverified.
