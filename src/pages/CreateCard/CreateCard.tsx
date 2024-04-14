import React, { useState } from 'react';

interface Chapter {
	subtitle: string;
	text: string;
	images: string[];
}

interface Variant {
	text: string;
}

interface Questions {
	title: string;
	variants: Variant[];
	correct: number;
}

interface CardData {
	id: number; // Добавляем id для карточки
	name: string;
	grade: string;
	picture: string; // Добавляем поле для картинки
	chapters: Chapter[];
	quiz: Questions[];
}

const CreateCard: React.FC = () => {
	const [step, setStep] = useState<number>(1);
	const [cardData, setCardData] = useState<CardData>({
		id: Date.now(), // Генерируем уникальный id при создании карточки
		name: '',
		grade: '',
		picture: '', // Инициализируем пустую строку для картинки
		chapters: [],
		quiz: [],
	});
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCardData({ ...cardData, [name]: value });
	};
	
	const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]; // Получаем файл из события
		if (file) {
			const reader = new FileReader(); // Создаем объект FileReader
			reader.readAsDataURL(file); // Читаем файл как data URL
			reader.onload = () => {
				if (reader.result) {
					setCardData({ ...cardData, picture: reader.result.toString() }); // Устанавливаем картинку как строку base64
				}
			};
		}
	};
	
	const handleChapterChange = (value: string, index: number, field: keyof Chapter) => {
		const updatedChapters = [...cardData.chapters];
		updatedChapters[index] = { ...updatedChapters[index], [field]: value };
		setCardData({ ...cardData, chapters: updatedChapters });
	};
	
	const handleImageChange = (value: string, index: number) => {
		const updatedChapters = [...cardData.chapters];
		updatedChapters[index].images.push(value);
		setCardData({ ...cardData, chapters: updatedChapters });
	};
	
	const handleQuestionTitleChange = (value: string, questionIndex: number) => {
		const updatedQuiz = [...cardData.quiz];
		updatedQuiz[questionIndex].title = value;
		setCardData({ ...cardData, quiz: updatedQuiz });
	};
	
	const handleVariantChange = (value: string, questionIndex: number, variantIndex: number) => {
		const updatedQuiz = [...cardData.quiz];
		updatedQuiz[questionIndex].variants[variantIndex].text = value;
		setCardData({ ...cardData, quiz: updatedQuiz });
	};
	
	const addChapter = () => {
		setCardData({
			...cardData,
			chapters: [...cardData.chapters, { subtitle: '', text: '', images: [] }],
		});
	};
	
	const addQuizQuestion = () => {
		setCardData({
			...cardData,
			quiz: [...cardData.quiz, { title: '', variants: [{ text: '' }], correct: 0 }],
		});
	};
	
	const handleAddVariant = (questionIndex: number) => {
		const updatedQuiz = [...cardData.quiz];
		updatedQuiz[questionIndex].variants.push({ text: '' });
		setCardData({ ...cardData, quiz: updatedQuiz });
	};
	
	const handleCorrectChange = (value: string, questionIndex: number) => {
		const updatedQuiz = [...cardData.quiz];
		updatedQuiz[questionIndex].correct = parseInt(value);
		setCardData({ ...cardData, quiz: updatedQuiz });
	};
	
	const handleSubmit = () => {
		console.log(cardData);
	};
	
	return (
		<div>
			{step === 1 && (
				<form>
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" value={cardData.name} onChange={handleInputChange} />
					<label htmlFor="grade">Grade:</label>
					<input type="text" name="grade" value={cardData.grade} onChange={handleInputChange} />
					<label htmlFor="picture">Picture:</label>
					<input type="file" name="picture" onChange={handlePictureChange} />
					<button type="button" onClick={() => setStep(2)}>Continue</button>
					{cardData.picture && <img src={cardData.picture} alt="Card" />} {/* Показываем картинку, если она есть */}
				</form>
			)}
			
			{step === 2 && (
				<form>
					{cardData.chapters.map((chapter, index) => (
						<div key={index}>
							<label htmlFor={`subtitle-${index}`}>Subtitle:</label>
							<input type="text" value={chapter.subtitle} onChange={(e) => handleChapterChange(e.target.value, index, 'subtitle')} />
							<label htmlFor={`text-${index}`}>Text:</label>
							<textarea value={chapter.text} onChange={(e) => handleChapterChange(e.target.value, index, 'text')} />
							<label>Images:</label>
							{chapter.images.map((_, imageIndex) => (
								<div key={imageIndex}>
									<input
										type='file'
										onChange={(e) => handleImageChange(e.target.value, index)}
									/>
								</div>
							))}
							<button type="button" onClick={() => handleImageChange('', index)}>Add Image</button>
						</div>
					))}
					<button type="button" onClick={addChapter}>Add Chapter</button>
					<button type="button" onClick={() => setStep(3)}>Continue</button>
				</form>
			)}
			
			{step === 3 && (
				<form>
					{cardData.quiz.map((question, index) => (
						<div key={index}>
							<label htmlFor={`title-${index}`}>Question Title:</label>
							<input type="text" value={question.title} onChange={(e) => handleQuestionTitleChange(e.target.value, index)} />
							<label>Question Variants:</label>
							{question.variants.map((variant, variantIndex) => (
								<div key={variantIndex}>
									<input type="text" value={variant.text} onChange={(e) => handleVariantChange(e.target.value, index, variantIndex)} />
								</div>
							))}
							<button type="button" onClick={() => handleAddVariant(index)}>Add Variant</button>
							<label htmlFor={`correct-${index}`}>Correct Answer Index:</label>
							<input type="number" value={question.correct} onChange={(e) => handleCorrectChange(e.target.value, index)} />
						</div>
					))}
					<button type="button" onClick={addQuizQuestion}>Add Quiz Question</button>
					<button type="button" onClick={handleSubmit}>Submit</button>
				</form>
			)}
		</div>
	);
};

export default CreateCard;
