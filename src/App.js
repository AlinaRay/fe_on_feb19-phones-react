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
        const items = [...this.state.basketItems];
        const itemIndex = items.findIndex((el) => el.name === phoneId);
        if (itemIndex > -1) {
          items[itemIndex] = {
              ...items[itemIndex],
              count: items[itemIndex].count + 1
          };
          this.setState({
              basketItems: items,
          })
        } else {
           this.setState({
               basketItems: [...items, {name: phoneId, count: 1}]
           })
        }
    };
    removeFromBasket = (index) => {
        const newBasket = [...this.state.basketItems];


        this.setState((prevState) => {
            if (prevState.basketItems[index].count >= 2) {
                newBasket[index].count = newBasket[index].count - 1;
            } else {
                newBasket.splice(index);
            }
            return {
                basketItems: [...newBasket]
            }
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
        this.setState((prevState) => {
            return {
                phones: [...prevState.phones].sort((a, b) => a.name.localeCompare(b.name))
            }
        })
    };

    sortByAge = () => {
        this.setState((prevState) => {
            return {
                phones: [...prevState.phones].sort((a, b) => a.age - b.age)
            }
        })
    };
    search = (event) => {
        let updatedList = getAll();
        updatedList = updatedList.filter(item => {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState(() => {
            return {
                phones: updatedList
            }
        })
    };

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <Filter sortPhones={this.sortPhones}
                                    search={this.search}/>
                            <Basket
                                items={this.state.basketItems}
                                removeFromBasket={this.removeFromBasket}
                            />
                        </div>
                        <div className="col-md-10">
                            {this.state.selectedPhone ? (
                                <Viewer
                                    phone={this.state.selectedPhone}
                                    onBack={() => {
                                        this.setState({
                                            selectedPhone: null,
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
