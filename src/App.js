import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listCourses } from './graphql/queries';

import '@aws-amplify/ui-react/styles.css';
import { Flex, Collection, Card, Badge, Heading } from '@aws-amplify/ui-react';

import ReactMarkdown from 'react-markdown';

import {withAuthenticator} from '@aws-amplify/ui-react';

function App() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
     const response = await API.graphql({ query: listCourses });
     setCourses(response.data.listCourses.items);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div style={{padding:'10px'}}>
      <h1>List of available courses</h1>
      <Collection type='list' direction='row' items={courses} gap='20px' wrap='wrap'>
        {course => (
        <Card variation='elevated' key={course.id} width='49%'>
          <Heading level={5}>{course.name}</Heading>
          <ReactMarkdown>{course.description}</ReactMarkdown>
          <Flex>
            <Badge variation='info'>
              {course.duration} minutes
            </Badge>
            <Badge variation='success'>
              ${course.price}
            </Badge>
          </Flex>
        </Card>
        )}
      </Collection>
    </div>
  );
}

export default withAuthenticator(App);
