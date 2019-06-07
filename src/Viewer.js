import React from 'react';


class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: this.props.phone.images[0]
        }
    }
    handleClick(index) {
        console.log(index);
        this.setState({
            currentImage: this.props.phone.images[index]
        })
    }
    render() {
        const {onBack, phone: {name, description, images}} = this.props;
        const {currentImage} = this.state;
        return (
            <div>
                <img className="phone" src={currentImage}/>
                <button onClick={onBack}>Back</button>
                <button>Add to basket</button>

                <h1>{name}</h1>
                <p>{description}</p>

                <ul className="phone-thumbs">
                    { images.map((imageUrl, index) => (
                        <li key={index}>
                            <img src={imageUrl} onClick={() => this.handleClick(index)}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default Viewer;