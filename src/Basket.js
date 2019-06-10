import React from 'react';

export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
    }
    render() {
        const {removeFromBasket}= this.props;
        return (
            <section>
                <p>Basket</p>
                <ul>
                    {
                        this.props.items && this.props.items.map((item, index) => (
                            <li key={index}>{item.name} {item.count}
                                <button onClick={()=> {
                                    removeFromBasket(index);
                                }}>x</button>
                            </li>

                        ))
                    }
                </ul>
            </section>
        );
    }

};
