import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice:0,
        minSize: 0,
        maxSize: 0,
        pets: false
    }

    //getData
    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))

        this.setState({
            rooms: rooms,
            featuredRooms: featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        })
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)

            let room = {...item.fields, images, id}
            return room

        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    handleChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = e.target.name

        this.setState({
            [name]:value
        },this.filterRooms)
    }

    filterRooms = () => {
        //why do we have to destructure this way???????/
        let {
            rooms,
            type,
            capacity,
            minSize,
            maxSize,
            minPrice,
            maxPrice,
            price,
            breakfast,
            pets
        } = this.state

        //assign all the rooms to temp
        let tempRooms = [...rooms]

        //transform values, that is change them from string to integer
        capacity  = parseInt(capacity)
        price  = parseInt(price)

        //filter by types
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //filter by capacity
        if(capacity !==1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price)

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        // filter by breakfast
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        //change state
        this.setState({
            sortedRooms:tempRooms
        })
    }

    render() {
        return (
            <>
                <RoomContext.Provider 
                    value={{ ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}
                >
                    {this.props.children}
                </RoomContext.Provider>
            </>
        )
    }
}


const RoomConsumer = RoomContext.Consumer


//I have no idea what we have just done here
//Higher order component - read up
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomContext, RoomConsumer}