import React from 'react'
import { useContext } from 'react'
import {RoomContext} from '../Context'
import Title from '../components/Title'

//get all unique values
const getUnique = (item,value) => {
    return [...new Set(item.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext)
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context

    //get all unique types
    let types = getUnique(rooms,'type')

    //add all
    types = ['all',...types]

    //map to jsx
    types = types.map((item, index)=>{
        return <option value={item} key={index}>{item}</option>
    })

    //get all unique capacity
    let people = getUnique(rooms,'capacity')
    people = people.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* Select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                        name="type" 
                        id="type" 
                        value={type} 
                        className="form-control" 
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* End of Select type */}
                {/* Guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select 
                        name="capacity" 
                        id="capacity" 
                        value={capacity} 
                        className="form-control" 
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* End of Guests */}
                {/* Price filter */}
                <div className="form-group">
                    <label htmlFor="price">room price N{price}</label>
                    <input 
                        type="range" 
                        name="price"  
                        min={minPrice} 
                        max = {maxPrice} 
                        id="price" 
                        value={price} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                {/* End of price filter */}
                {/* Room size filter */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input
                            type="number"
                            name="minSize"
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                        <input
                            type="number"
                            name="maxSize"
                            id="size"
                            value={maxSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                    </div>
                        
                </div>
                {/* End of Room size filter */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input 
                            type="checkbox"
                            name="breakfast"
                            id="breakfast"
                            checked={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input 
                            type="checkbox"
                            name="pets"
                            id="pets"
                            checked={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}
