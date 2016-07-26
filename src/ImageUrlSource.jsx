import React, {
    Component
} from 'react';
import StackBlur from 'stackblur-canvas';

export default class ImageUrlSource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this.onImageLoad = this.onImageLoad.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loaded: this.state.loaded && nextProps.imageUrl === this.props.imageUrl
        });
    }

    componentDidUpdate() {
        const props = this.props;

        if (this.state.loaded) {
            this.renderImage(props.width, props.height, props.blurRadius);
        }
    }

    render() {
        const {
            style,
            imageUrl,
            width,
            height
            } = this.props;

        let componentStyle = {
            padding: 0,
            margin: 0,
            top: 0
        };

        width && Object.assign(componentStyle, {
            width: `${width}px`
        });
        height && Object.assign(componentStyle, {
            height: `${height}px`
        });
        style && Object.assign(componentStyle, style);

        return (
            <div style={componentStyle}>
                <img style={{display: 'none'}}
                     src={imageUrl}
                     ref={c => this.image = c}
                     onLoad={this.onImageLoad}/>
                <canvas style={componentStyle}
                        ref={c => this.canvas = c}/>
            </div>
        )
    }

    renderImage() {
        const {
            canvas,
            image
            } = this;

        if (!canvas || !image) {
            return;
        }

        const {
            radius,
            width,
            height,
            blurAlphaChannel
            } = this.props;

        StackBlur.image(image, canvas, radius, blurAlphaChannel);

        width && (canvas.style.width = `${width}px`);
        height && (canvas.style.height = `${height}px`);
    }

    onImageLoad() {
        this.setState({
            loaded: true
        });
    }
}

ImageUrlSource.propTypes = {
    imageUrl: React.PropTypes.string,
    blurAlphaChannel: React.PropTypes.number,
    radius: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

ImageUrlSource.defaultProps = {
    blurAlphaChannel: false,
    radius: 10,
    width: 600,
    height: 190
};
