#!/usr/bin/env bash

set -euo pipefail

# Parse command line arguments
JSON_MODE=false

for arg in "$@"; do
    case "$arg" in
        --json) 
            JSON_MODE=true 
            ;;
        --help|-h) 
            echo "Usage: $0 [--json]"
            echo "  --json    Output results in JSON format"
            echo "  --help    Show this help message"
            exit 0 
            ;;
        *) 
            echo "ERROR: Unknown argument: $arg" >&2
            echo "Usage: $0 [--json]" >&2
            exit 1
            ;;
    esac
done

# Get script directory and load common functions
SCRIPT_DIR="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ ! -f "$SCRIPT_DIR/common.sh" ]]; then
    echo "ERROR: Required file common.sh not found at $SCRIPT_DIR/common.sh" >&2
    exit 1
fi
source "$SCRIPT_DIR/common.sh"

# Get all paths and variables from common functions
if ! eval "$(get_feature_paths)"; then
    echo "ERROR: Failed to get feature paths from get_feature_paths" >&2
    exit 1
fi

# Check if we're on a proper feature branch (only for git repos)
check_feature_branch "$CURRENT_BRANCH" "$HAS_GIT" || exit 1

# Ensure the feature directory exists
mkdir -p "$FEATURE_DIR"

# Copy plan template if it exists
TEMPLATE="$REPO_ROOT/.specify/templates/plan-template.md"
if [[ -f "$TEMPLATE" ]]; then
    if [[ -f "$IMPL_PLAN" ]]; then
        echo "Plan file already exists at $IMPL_PLAN (not overwriting)"
    else
        cp "$TEMPLATE" "$IMPL_PLAN"
        echo "Copied plan template to $IMPL_PLAN"
    fi
else
    echo "Warning: Plan template not found at $TEMPLATE"
    # Create a basic plan file if template doesn't exist
    if [[ ! -f "$IMPL_PLAN" ]]; then
        touch "$IMPL_PLAN"
    fi
fi

# Output results
if $JSON_MODE; then
    if command -v jq >/dev/null 2>&1; then
        jq -n \
          --arg FEATURE_SPEC "$FEATURE_SPEC" \
          --arg IMPL_PLAN "$IMPL_PLAN" \
          --arg SPECS_DIR "$FEATURE_DIR" \
          --arg BRANCH "$CURRENT_BRANCH" \
          --arg HAS_GIT "$HAS_GIT" \
          '{FEATURE_SPEC:$FEATURE_SPEC, IMPL_PLAN:$IMPL_PLAN, SPECS_DIR:$SPECS_DIR, BRANCH:$BRANCH, HAS_GIT:$HAS_GIT}'
    else
        echo "ERROR: --json requires jq to be installed" >&2
        exit 2
    fi
else
    echo "FEATURE_SPEC: $FEATURE_SPEC"
    echo "IMPL_PLAN: $IMPL_PLAN" 
    echo "SPECS_DIR: $FEATURE_DIR"
    echo "BRANCH: $CURRENT_BRANCH"
    echo "HAS_GIT: $HAS_GIT"
fi

