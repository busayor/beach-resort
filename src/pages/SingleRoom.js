import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
// import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../Context'
import StyledHero from '../components/StyledHero'


export default class SingleRoom extends Component {
    constructor(props){
        super(props)
        // console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext

    // componentDidMount(){

    // }

    render() {
        const {getRoom} = this.context
        const room = getRoom(this.state.slug)
        if(!room){
            return<div className="error">
                <h3>No such room could be found</h3>
                <Link to='/rooms' className="btn-primary">
                    Back to rooms
                </Link>
            </div>
        }
        const { name, description, price, breakfast, extras, pets, images, size, capacity} = room
        //we are doing this to destructure hence we get only other images
        const [mainImg,...defaultImg] = images
        // console.log(mainImg)

        return (
            <>
            {/* Was trying to make each room dynami, some how, I could not */}
            {/* get it to work */}
             <StyledHero img={mainImg || this.state.defaultBcg}>
                 <Banner title = {`${name} room`}>
                     <Link to="/rooms" className="btn-primary">
                         Back to rooms
                     </Link>
                 </Banner>
             </StyledHero>
            {/* <Hero hero="roomsHero">
                <Banner title = {`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms
                    </Link>
                </Banner>
            </Hero> */}
            <section className="single-room">
                <div className="single-room-images">
                    {/* {defaultImg.map((item, index) =>{
                        return <img key={index} src={item} alt={name}/>
                    })} */}
                    {defaultImg.map((item, index) =>{
                        return <img key={index} src={item} alt={name}/>
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price: N{price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>
                            max capacity: {
                                capacity > 1 ? `${capacity} people`:
                                              `${capacity} person`
                            }
                        </h6>
                        <h6>
                            {pets?"pets allowed":"no pets allowed"}
                        </h6>
                        <h6>
                            {/* {breakfast ? "free breakfast included": ""} */}
                            {breakfast && "free breakfast included"}
                        </h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                            {extras.map((item, index) =>{
                               return <li key={index}>- {item}</li>
                            })}
                    </ul>
            </section>    
            </>
        )
    }
}
