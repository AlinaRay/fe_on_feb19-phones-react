import React from 'react';

import {getAll, getById} from './api/phone'
import Basket from './Basket'
import Filter from './Filter'
import Catalog from './Catalog'
import Viewer from './Viewer'
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phones: getAll(),
            selectedPhone: null,
            basketItems: [],
        };
    }

    addToBasket = (phoneId) => {
        const items = this.state.basketItems;
        const isItemPresent = items.filter(el => el.name === phoneId).length > 0;
        if (isItemPresent) {
            let item = items.find(el => {
                return el.name === phoneId;
            });
            item.count = Number.parseInt(item.count) + 1;

            this.setState({
                basketItems: [...items]
            })
        }
        else {
            this.setState({
                basketItems: [...items, {name: phoneId, count: 1}]
            })
        }
    };
    removeFromBasket = (index) => {
        console.log(index);
        let newBasket = this.state.basketItems;
        newBasket.splice(index);
        this.setState({
            basketItems: newBasket
        })
    };
    sortPhones = (e) => {
        switch (e) {
            case 'name':
                this.sortByName();
                break;
            case 'age':
                this.sortByAge();
                break;
            default:
                this.sortByName();
        }
    };
    sortByName = () => {
        this.setState({
            phones: getAll(),
            selectedPhone: null,
            basketItems: [],
        })
    };

    sortByAge = () => {
        this.setState(() => {
            let items = getAll();
            items.sort((a, b) => a.age - b.age);
            return {
                phones: items,
                selectedPhone: null,
                basketItems: [],
            }
        })
    };

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <Filter sortPhones={this.sortPhones}/>
                            <Basket
                                items={this.state.basketItems}
                                removeFromBasket={this.removeFromBasket}
                            />
                        </div>
ш
                        <div className="col-md-10">
                            {this.state.selectedPhone ? (
                                <Viewer
                                    phone={this.state.selectedPhone}
                                    onBack={() => {
                                        this.setState({
                                            selectedPhone: null,
                                            namePhone: null
                                        });
                                    }}
                                    addToBasket={this.addToBasket}
                                />
                            ) : (
                                <Catalog
                                    phones={this.state.phones}
                                    onPhoneSelected={(phoneId) => {
                                        this.setState({
                                            selectedPhone: getById(phoneId),
                                            namePhone: phoneId,
                                        });
                                    }}
                                    addToBasket={this.addToBasket}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
