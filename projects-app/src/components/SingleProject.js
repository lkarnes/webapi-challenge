import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function SingleProject(props) {
    const id = props.match.params.id;
    const [project, setProject]= useState();
    useEffect(()=>{
        axios.get(`http://localhost:5000/${id}`)
        .then(res => {
            setProject(res.data)
        })
    }, [])
    console.log(project)
    if(!project){
        return <div>Loading...</div>
    }else
    return (
        <div>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
            {project.actions.map(action => (
                <div>
                    <h4>{action.description}</h4>
                    <p>{action.notes}</p>
                </div>
            ))}
        </div>
    )
}