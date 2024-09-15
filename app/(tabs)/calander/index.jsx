import { View, Text } from 'react-native'
import React from 'react'
import ParentView from './parentView';
import CoachView from './coachView';

export default function index () {
    const data = 1;
    if(data == 1) {
        return (
            <>
                <ParentView />
            </>
        );
    }
    else if(data == 2) {
        return (
            <>
                <CoachView />
            </>
        );
    }
    else {
        return (
            <>
                <Text>Error</Text>
            </>
        );
    }

}