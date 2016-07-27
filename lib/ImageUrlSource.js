'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stackblurCanvas = require('stackblur-canvas');

var _stackblurCanvas2 = _interopRequireDefault(_stackblurCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUrlSource = function (_Component) {
    _inherits(ImageUrlSource, _Component);

    function ImageUrlSource(props) {
        _classCallCheck(this, ImageUrlSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageUrlSource).call(this, props));

        _this.state = {
            loaded: false
        };

        _this.onImageLoad = _this.onImageLoad.bind(_this);
        return _this;
    }

    _createClass(ImageUrlSource, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                loaded: this.state.loaded && nextProps.imageUrl === this.props.imageUrl
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var props = this.props;

            if (this.state.loaded) {
                this.renderImage(props.width, props.height, props.blurRadius);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var style = _props.style;
            var imageUrl = _props.imageUrl;
            var width = _props.width;
            var height = _props.height;


            var componentStyle = {
                padding: 0,
                margin: 0,
                top: 0,
                width: width + 'px',
                height: height + 'px'
            };

            style && _extends(componentStyle, style);

            return _react2.default.createElement(
                'div',
                { style: componentStyle },
                _react2.default.createElement('img', { style: { display: 'none' },
                    src: imageUrl,
                    ref: function ref(c) {
                        return _this2.image = c;
                    },
                    onLoad: this.onImageLoad }),
                _react2.default.createElement('canvas', { style: componentStyle,
                    ref: function ref(c) {
                        return _this2.canvas = c;
                    } })
            );
        }
    }, {
        key: 'renderImage',
        value: function renderImage() {
            var canvas = this.canvas;
            var image = this.image;


            if (!canvas || !image) {
                return;
            }

            var _props2 = this.props;
            var radius = _props2.radius;
            var width = _props2.width;
            var height = _props2.height;
            var blurAlphaChannel = _props2.blurAlphaChannel;


            _stackblurCanvas2.default.image(image, canvas, radius, blurAlphaChannel);

            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
        }
    }, {
        key: 'onImageLoad',
        value: function onImageLoad() {
            this.setState({
                loaded: true
            });
        }
    }]);

    return ImageUrlSource;
}(_react.Component);

exports.default = ImageUrlSource;


ImageUrlSource.propTypes = {
    imageUrl: _react2.default.PropTypes.string,
    blurAlphaChannel: _react2.default.PropTypes.number,
    radius: _react2.default.PropTypes.number,
    width: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number
};

ImageUrlSource.defaultProps = {
    blurAlphaChannel: false,
    radius: 10,
    width: 600,
    height: 190
};