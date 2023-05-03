import React from 'react'
import myHOC from './myHoc'
import { useAppContext } from '../../Context/AppContext';


const UserForm = (props) => {
    const { data, handleInput } = props;

    const [state, dispatch] = useAppContext()
    const { firstName, lastName, email, employment, tech, preferredTech } = state

    if (data.element === "input") {
        return (
            <div style={{ "margin": "20px" }}>
                {data.option ? <div>
                    <label>{data.label}</label>
                    {data.option.map((item) => {
                        return (
                            <div key={item.id}>
                                <input className={item.type === "checkbox" ? "option" : ""} type={item.type} name={item.name} value={item.value ? item.value : ""} onChange={(e) => {
                                    handleInput({ input: e?.target?.value })
                                }} />
                                <label>{item.label}</label>
                            </div>
                        )
                    })}
                </div> : <div>
                    <label>{data.label}</label>
                    <input type={data.type} placeholder={data.placeholder} onChange={(e) => {
                        handleInput({ input: e?.target?.value })
                    }} />
                </div>}
            </div>
        )
    }
    if (data.element === "select") {
        return (
            <div style={{ "margin": "20px" }}>
                <label>{data.label}</label>
                <select>
                    {data.option.map((item) => {
                        return (
                            <option key={item.id}>{item}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    return (
        <></>
    )
}

export default myHOC(UserForm);