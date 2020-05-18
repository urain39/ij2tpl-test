#!/bin/sh

(find . -name 'test-*.js' | xargs -i node -- {}) > test_logs.log
