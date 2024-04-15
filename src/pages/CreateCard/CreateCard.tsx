import React, { useState } from 'react';
import type { CardProps } from '../../components/Card/Card.props.ts'
import type { ChapterProps, MaterialProps } from '../../components/Material/Material.props.ts'
import type { Card, Question } from '../../interfaces/Quiz.interfaces.ts'

const CreateCard: React.FC = () => {
	const [step, setStep] = useState<number>(1);
	const [cardData, setCardData] = useState<Card>({
		id: 0,
		quiz: []
	});
	const [cardProps, setCardProps] = useState<CardProps>({
		id: 0,
		name: '',
		grade: '',
		picture: ''
	});
	const [materialProps, setMaterialProps] = useState<MaterialProps>({
		id: 0,
		title: '',
		chapters: []
	});
	const [chapters, setChapters] = useState<ChapterProps[]>([]);
	const [chapterImages, setChapterImages] = useState<string[][]>([]);
	const [quiz, setQuiz] = useState<Question[]>([]);
	const [question, setQuestion] = useState<string>('');
	const [variants, setVariants] = useState<string[]>([]);
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	
	const handleContinue = () => {
		setStep(step + 1);
	};
	
	const handleCardPropsSubmit = () => {
		const newCardData: CardProps = { ...cardProps };
		setCardData({ ...cardData, ...newCardData });
		handleContinue();
	};
	
	const handleMaterialPropsSubmit = () => {
		const newMaterialProps: MaterialProps = { ...materialProps, chapters };
		setCardData({ ...cardData, ...newMaterialProps });
		handleContinue();
	};
	
	const handleChapterAdd = () => {
		const newChapter: ChapterProps = { subtitle: '', text: '', image: [] };
		const newChapterImages: string[] = [];
		setChapters([...chapters, newChapter]);
		setChapterImages([...chapterImages, newChapterImages]);
	};
	
	const handleImageUpload = (index: number, files: FileList | null) => {
		if (files && files.length > 0) {
			const images = Array.from(files).map(file => URL.createObjectURL(file));
			const updatedChapterImages = [...chapterImages];
			updatedChapterImages[index] = [...updatedChapterImages[index], ...images];
			setChapterImages(updatedChapterImages);
		}
	};
	
	const handleChapterChange = (index: number, field: keyof ChapterProps, value: string | string[]) => {
		const updatedChapters = [...chapters];
		if (field === 'subtitle' || field === 'text') {
			updatedChapters[index][field] = value as string;
		} else if (field === 'image') {
			updatedChapters[index][field] = value as string[];
		}
		setChapters(updatedChapters);
	};
	
	const handleQuizSubmit = () => {
		const newQuestion: Question = { title: question, variants, correct: correctIndex };
		setQuiz([...quiz, newQuestion]);
		setQuestion('');
		setVariants([]);
	};
	
	const handleVariantAdd = () => {
		setVariants([...variants, '']);
	};
	
	const handleVariantChange = (index: number, value: string) => {
		const updatedVariants = [...variants];
		updatedVariants[index] = value;
		setVariants(updatedVariants);
	};
	
	return (
		<div>
			{step === 1 && (
				<div>
					<h2>Step 1: Card Properties</h2>
					<input type="text" placeholder="ID" value={cardProps.id} onChange={(e) => setCardProps({ ...cardProps, id: parseInt(e.target.value) })} />
					<input type="text" placeholder="Name" value={cardProps.name} onChange={(e) => setCardProps({ ...cardProps, name: e.target.value })} />
					<input type='number' placeholder='Grade' value={cardProps.grade} onChange={(e) => setCardProps({ ...cardProps, grade: e.target.value })} min={9} max={11} />
					<input type="file" onChange={(e) => setCardProps({ ...cardProps, picture: URL.createObjectURL(e.target.files![0]) })} />
					<button onClick={handleCardPropsSubmit}>Continue</button>
				</div>
			)}
			
			{step === 2 && (
				<div>
					<h2>Step 2: Material Properties</h2>
					<input type="text" placeholder="Material ID" value={materialProps.id} onChange={(e) => setMaterialProps({ ...materialProps, id: parseInt(e.target.value) })} />
					<input type="text" placeholder="Material Title" value={materialProps.title} onChange={(e) => setMaterialProps({ ...materialProps, title: e.target.value })} />
					{chapters.map((chapter, index) => (
						<div key={index}>
							<input type="text" placeholder="Chapter Subtitle" value={chapter.subtitle} onChange={(e) => handleChapterChange(index, 'subtitle', e.target.value)} />
							<textarea placeholder="Chapter Text" value={chapter.text} onChange={(e) => handleChapterChange(index, 'text', e.target.value)} />
							<input type="file" onChange={(e) => handleImageUpload(index, e.target.files)} multiple />
							{chapterImages[index].map((image, imgIndex) => (
								<img key={imgIndex} src={image} alt={`Chapter ${index + 1} Image ${imgIndex + 1}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
							))}
						</div>
					))}
					<button onClick={handleChapterAdd}>Add Chapter</button>
					<button onClick={handleMaterialPropsSubmit}>Continue</button>
				</div>
			)}
			
			{step === 3 && (
				<div>
					<h2>Step 3: Quiz</h2>
					<input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
					{variants.map((variant, index) => (
						<div key={index}>
							<input type="text" placeholder="Variant" value={variant} onChange={(e) => handleVariantChange(index, e.target.value)} />
						</div>
					))}
					<button onClick={handleVariantAdd}>Add Variant</button>
					<input type="number" placeholder="Correct Index" value={correctIndex} onChange={(e) => setCorrectIndex(parseInt(e.target.value))} />
					<button onClick={handleQuizSubmit}>Add Question</button>
					{quiz.map((q, index) => (
						<div key={index}>
							<p>Question: {q.title}</p>
							<p>Variants: {q.variants.join(', ')}</p>
							<p>Correct Index: {q.correct}</p>
						</div>
					))}
					<button onClick={handleContinue}>Finish</button>
				</div>
			)}
		</div>
	);
};

export default CreateCard;
