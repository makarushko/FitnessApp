import React, {useState} from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import Exercises from "../Exercises";
import HeroBanner from "../HeroBanner";
import SearchExercises from "../SearchExercises";
const Main = () => {

	const [exercises, setExercises] = useState([]);
	const [bodyPart, setBodyPart] = useState('all');

	return (
		<Box>
			<HeroBanner />
			<SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
			<Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
		</Box>
	);
};

export default Main;
