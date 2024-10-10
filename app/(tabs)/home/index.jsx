import { View, Text } from 'react-native'
import React from 'react'
import ParentView from './parantView';
import CoachView from './coachView';
import StudentView from './studentView';

export default function index () {
    const data = 2;
    if(data == 1) {
        return (
            <> 
                <CoachView />
            </>
        );
    }
    else if(data == 2) {
        return (
            <>
                <StudentView />
            </>
        );
    }
    else {
        return (
            <>
                <ParentView />
            </>
        );
    }

}