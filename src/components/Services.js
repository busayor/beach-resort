import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "free cocktails",
                info: "lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance"
            },
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance"
            },
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttle",
                info: "lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance"
            },
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: "lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance lorem ipsum madgnitude assistance"
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((service,index) => {
                        return (
                            <article className="service" key={index}>
                                <span>{service.icon}</span>
                                <h6>{service.title}</h6>
                                <p>{service.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
