import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function HomePage(){
    const [projects, setProjects] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:5000')
        .then(res=> {
        setProjects(res.data)
        console.log(res.data)
        })
    }, [])

    return (
        <div>
        {projects.map(project => (
          <Link to={`/${project.id}`}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>{project.completed ? 'complete' : 'incomplete'}</p>
          </Link>
        ))}
      </div>
    )
}