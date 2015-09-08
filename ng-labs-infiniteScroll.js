angular.module('labs.infiniteScroll', []).directive('infiniteScroll', [
	'$rootScope', '$timeout', '$parse',
	function($rootScope, $timeout, $parse) {
		return {
			link: function(scope, elem, attrs) {
				var checkWhenEnabled, handler, scrollDistance, scrollEnabled, fetchItems;
				scrollDistance = 0;

				if (attrs.infiniteScrollDistance) {
					scope.$watch(attrs.infiniteScrollDistance, function(value) {
						scrollDistance = parseInt(value, 10);
					});
				}

				scrollEnabled = true;
				checkWhenEnabled = false;

				if (attrs.infiniteScrollDisabled) {
					scope.$watch(attrs.infiniteScrollDisabled, function(value) {
						scrollEnabled = !value;
						if (scrollEnabled && checkWhenEnabled) {
							checkWhenEnabled = false;
							return handler();
						}
					});
				}

				fetchItems = (function() {
					return $parse(attrs.infiniteScroll).bind(null, scope);
				})();

				handler = function() {
					var viewBottom = elem.scrollTop() + elem.height();
					var remaining = elem[0].scrollHeight - viewBottom;
					var shouldScroll = remaining <= scrollDistance;

					if (shouldScroll && scrollEnabled) {
						return scope.$applyAsync(fetchItems);
					} else if (shouldScroll) {
						return (checkWhenEnabled = true);
					}
				};

				elem.on('scroll', handler);
				scope.$on('$destroy', function() {
					return elem.off('scroll', handler);
				});

				return $timeout((function() {
					if (attrs.infiniteScrollImmediateCheck) {
						if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
							return handler();
						}
					} else {
						return handler();
					}
				}), 0);
			}
		};
	}
]);
