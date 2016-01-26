angular.module('Angello.Storyboard')
    .directive('dragContainer', function () {
        return {
            restrict: 'A',
            controller: 'DragContainerController',
            controllerAs: 'dragContainer',
            link: function ($scope, $element, $attrs, dragContainer) {
                dragContainer.init($element);

                $element.on('dragstart', dragContainer.handleDragStart.bind(dragContainer));
                $element.on('dragend', dragContainer.handleDragEnd.bind(dragContainer));

                $scope.$watch($attrs.dragContainer, dragContainer.updateDragData.bind(dragContainer));
                $attrs.$observe('mimeType', dragContainer.updateDragType.bind(dragContainer));

                $attrs.$set('draggable', true);
            }
        };
    })
    .controller('DragContainerController', function ($scope, $element, $attrs, $log, $dragging) {
        var vm = this;

        vm.init = function (element) {
            vm.el = element;
        };

        vm.handleDragStart = function (e) {
            $log.debug('Drag start: ', vm.el);

            if (e.originalEvent) e = e.originalEvent;

            e.dataTransfer.dropEffect = 'move';
            e.dataTransfer.effectAllowed = 'move';

            vm.el.addClass('drag-container-active'); // TODO minek
            e.dataTransfer.setData('text', 'forFFBug');
            vm.dragging = true;

            $dragging.setData(vm.data);
            $dragging.setType(vm.type);
        };

        vm.handleDragEnd = function () {
            $log.debug('Drag end: ', this.el);

            vm.el.removeClass('drag-container-active');
            vm.dragging = false;

            $dragging.setData(null);
            $dragging.setType(null);
        };

        vm.updateDragData = function (data) {
            $log.debug('Update drag data:', data);

            vm.data = data;
            if (vm.dragging) {
                $dragging.setData(vm.data);
            }
        };

        vm.updateDragType = function (type) {
            $log.debug('Update drag type:', type);

            vm.type = type || 'text/x-drag-and-drop';
            if (vm.dragging) {
                $dragging.setType(vm.type);
            }
        }

    })
    .directive('dropContainer', ['$document', '$parse',
        function ($document, $parse) {
            return {
                restrict: 'A',
                controller: 'DropContainerController',
                controllerAs: 'dropContainer',
                link: function ($scope, $element, $attrs, dropContainer) {
                    var bindTo = function (event) {
                        return function (e) {
                            $scope.$apply(function () {
                                return dropContainer['handle' + event](e);
                            });
                        }
                    };

                    var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
                    var handleDragEnter = bindTo('DragEnter');
                    var handleDragOver = bindTo('DragOver');
                    var handleDragLeave = bindTo('DragLeave');
                    var handleDrop = bindTo('Drop');

                    dropContainer.init($element, $scope, {
                        onDragEnter: $parse($attrs.onDragEnter),
                        onDragOver: $parse($attrs.onDragOver),
                        onDragLeave: $parse($attrs.onDragLeave),
                        onDrop: $parse($attrs.onDrop)
                    });

                    $element.on('dragenter', handleDragEnter);
                    $element.on('dragover', handleDragOver);
                    $element.on('dragleave', handleDragLeave);
                    $element.on('drop', handleDrop);

                    $scope.$watch($attrs.accepts, dropContainer.updateMimeTypes.bind(dropContainer));

                    $document.on('dragend', dragEnd); //TODO: ez minek?
                    $scope.$on('destroy', function () {
                        $document.off('dragend', dragEnd);
                    })
                }
            };
        }])
    .controller('DropContainerController', function ($log, $dragging) {
        var vm = this;
        var targets = {};
        var validAnchors = 'center top bottom'.split(' ');

        vm.init = function (element, scope, callbacks) {
            vm.el = element;
            vm.scope = scope;
            vm.callbacks = callbacks;
            vm.accepts = ['text/x-drag-and-drop'];

            vm.el.addClass('drop-container');
        };

        vm.handleDragEnter = function (event) {
            if (event.originalEvent) event = event.originalEvent;

            if (!vm.accepts || vm.accepts.indexOf($dragging.getType()) >= 0) {
                event.preventDefault();
            } else {
                return;
            }

            var eventData = vm.updateDragTarget(event);

            if (vm.callbacks.onDragEnter) {
                vm.callbacks.onDragEnter(vm.scope, eventData);
            }
        };

        vm.handleDragOver = function (event) {
            if (event.originalEvent) event = event.originalEvent;

            if (!vm.accepts || vm.accepts.indexOf($dragging.getType()) >= 0) {
                event.preventDefault();
            } else {
                return;
            }
        };

        vm.handleDragLeave = function (eventData) {

        };

        vm.handleDrop = function (event) {
            if (!vm.accepts || vm.accepts.indexOf($dragging.getType()) >= 0) {
                event.preventDefault();
            } else {
                return;
            }

            if (vm.callbacks.onDrop) {
                vm.callbacks.onDrop(vm.scope, {data: $dragging.getData()});
            }

        };

        vm.handleDragEnd = function (event) {

        };

        vm.updateMimeTypes = function (mimeTypes) {
            if (!mimeTypes) mimeTypes = ['text/x-drag-and-drop'];
            if (!angular.isArray(mimeTypes)) mimeTypes = [mimeTypes];

            vm.accepts = mimeTypes;
        };

        vm.addDropTarget = function (anchor, dropTarget) {
            if (validAnchors.indexOf(anchor) < 0) {
                throw new Error('Invalid anchor point ' + anchor);
            }

            if (targets[anchor]) {
                throw new Error('Duplicate drop targets for the anchor ' + anchor);
            }

            targets[anchor] = dropTarget;
        };

        vm.removeDropTarget = function (anchor) {
            //if(targets[anchor] && targets[anchor] === anchor){ TODO minek?
            //    vm.activeTarget = null
            //}

            delete targets[anchor];
        };

        vm.updateDragTarget = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            var activeTarget = null;
            var activeAnchor = null;
            var mindDistanceSq = Number.MAX_VALUE;

            var prevAnchor = vm.activeAnchor;
            var prevTarget = vm.activeTarget;

            angular.forEach(targets, function (dropTarget, anchor) {
                var width = vm.el[0].offsetWidth;
                var height = vm.el[0].offsetHeight;
                var anchorX = width / 2;
                var anchorY = height / 2;

                if (anchor.indexOf('left') >= 0) anchorX = 0;
                if (anchor.indexOf('top') >= 0) anchorY = 0;
                if (anchor.indexOf('right') >= 0) anchorX = width;
                if (anchor.indexOf('bottom') >= 0) anchorY = height;

                var distanceSq = Math.pow(anchorX - e.offsetX, 2) + Math.pow(anchorY - e.offsetY, 2);

                if (distanceSq < mindDistanceSq) {
                    mindDistanceSq = distanceSq;
                    activeAnchor = anchor;
                    activeTarget = dropTarget;
                }
            });

            vm.activeAnchor = activeAnchor;
            vm.activeTarget = activeTarget;

            var eventData = {
                $event: e,
                data: $dragging.getData(),
                anchor: activeAnchor,
                target: activeTarget,
                prevAnchor: prevAnchor,
                prevTarget: prevTarget
            };

            if (prevTarget != activeTarget) {
                vm.handleDragLeave(eventData);
            }

            if (activeTarget) {
                activeTarget.handleDragEnter(eventData);
            }

            return eventData;
        };
    })
    .directive('dropTarget', function ($parse) {
        return {
            restrict: 'A',
            require: ['^dropContainer', 'dropTarget'],
            controller: 'DropTargetController',
            controllerAs: 'dropTarget',
            link: function ($scope, $element, $attrs, ctrls) {
                var dropContainer = ctrls[0];
                var dropTarget = ctrls[1];
                var anchor = $attrs.dropTarget || 'center';

                var destroy = dropContainer.removeDropTarget.bind(dropContainer, anchor);
                $element.addClass('drop-target drop-target-' + anchor);

                dropTarget.init($element, $scope, {
                    onDragEnter: $parse($attrs.onDragEnter),
                    onDragOver: $parse($attrs.onDragOver),
                    onDragLeave: $parse($attrs.onDragLeave),
                    onDrop: $parse($attrs.onDrop)
                });

                dropContainer.addDropTarget(anchor, dropTarget);
                $scope.$on('$destroy', destroy);
            }
        }
    })
    .controller('DropTargetController', function () {
        var vm = this;

        vm.init = function (elem, scope, callbacks) {
            vm.el = elem;
            vm.scope = scope;
            vm.callbacks = callbacks;
        };

        vm.handleDragEnter = function (eventData) {
            vm.el.addClass('drop-target-active'); //TODO drop-target-active minek ???
            if (vm.callbacks.onDragEnter) {
                vm.callbacks.onDragEnter(vm.scope, eventData);
            }
        };

        vm.handleDragOver = function (eventData) {
            if (vm.callbacks.onDragOver) {
                vm.callbacks.onDragOver(vm.scope, eventData);
            }
        };

        vm.handleDragLeave = function (eventData) {
            vm.el.removeClass('drop-target-active');
            if (vm.callbacks.onDragLeave) {
                vm.callbacks.onDragLeave(vm.scope, eventData);
            }
        };

        vm.handleDrop = function (eventData) {
            if (vm.callbacks.onDrop) {
                vm.callbacks.onDrop(vm.scope, eventData);
            }
        };
    })
    .factory('$dragging', function () {
        var data = null;
        var type = null;

        return {
            getData: function () {
                return data;
            },
            getType: function () {
                return type;
            },
            setData: function (newData) {
                data = newData;
                return data;
            },
            setType: function (newType) {
                type = newType;
                return type;
            }
        };
    });
