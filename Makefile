.PHONY: test
test:
	$(MAKE) test -C cadence/lib/js/test

.PHONY: ci
ci:
	$(MAKE) ci -C cadence/lib/js/test
