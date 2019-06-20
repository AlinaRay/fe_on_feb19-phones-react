import React from 'react';


export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: this.props.phone.images[0]
        }
    }
    handleClick(index) {
        this.setState({
            currentImage: this.props.phone.images[index]
        })
    }
    render() {
        const {onBack, phone, addToBasket} = this.props;
        const {currentImage} = this.state;
        return (
            <div>
                <img className="phone" src={currentImage} alt={phone.name} />
                <button onClick={onBack}>Back</button>
                <button onClick={() => addToBasket(phone.name)}>Add to basket</button>

                <h1>{phone.name}</h1>
                <p>{phone.description}</p>

                <ul className="phone-thumbs">
                    {phone.images.map((imageUrl, index) => (
                        <li key={index}>
                            <img src={imageUrl} alt ={phone.name} onClick={() => this.handleClick(index)}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}