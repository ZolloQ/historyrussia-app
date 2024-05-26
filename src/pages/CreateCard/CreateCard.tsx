import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { IQuestion, IQuiz } from '../../interfaces/Quiz.interfaces';
import styles from './CreateCard.module.scss';
import { CardProps } from '../../components/Card/Card.props';
import { ChapterProps, MaterialProps, image } from '../../components/Material/Material.props';

const CreateCard: React.FC = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState<number>(1);
	const [quizData, setQuizData] = useState<IQuiz>({
		id: 0,
		quiz: [],
	});
	const [cardProps, setCardProps] = useState<CardProps>({
		id: 0,
		name: '',
		grade: '',
		picture: '',
	});
	const [materialProps, setMaterialProps] = useState<MaterialProps>({
		id: 0,
		title: '',
		chapters: [],
	});
	const [chapters, setChapters] = useState<ChapterProps[]>([]);
	const [chapterImages, setChapterImages] = useState<image[][]>([]);
	const [quiz, setQuiz] = useState<IQuestion[]>([]);
	const [question, setQuestion] = useState<string>('');
	const [variants, setVariants] = useState<string[]>([]);
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	
	const handleSaveCard = async () => {
		try {
			await axios.post('/cards', cardProps);
			
			if (cardProps.picture) {
				const formData = new FormData();
				formData.append('image', cardProps.picture);
				await axios.post('/admin/loadpic', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
			}
			
			await axios.post('/materials', materialProps);
			
			for (let i = 0; i < chapterImages.length; i++) {
				for (let j = 0; j < chapterImages[i].length; j++) {
					const formData = new FormData();
					formData.append('image', chapterImages[i][j].src);
					await axios.post(`/admin/loadpic`, formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
				}
			}
			
			await axios.post('/quiz', quizData);
			
			navigate('/');
		} catch (error) {
			console.error('Error saving data:', error);
		}
	};
	
	const handleContinue = () => {
		setStep(step + 1);
	};
	
	const handleCardPropsSubmit = () => {
		setQuizData({ ...quizData, ...cardProps });
		handleContinue();
	};
	
	const handleMaterialPropsSubmit = () => {
		setMaterialProps({ ...materialProps, chapters });
		handleContinue();
	};
	
	const handleChapterAdd = () => {
		const newChapter: ChapterProps = { subtitle: '', text: '', images: [] };
		setChapters([...chapters, newChapter]);
		setChapterImages([...chapterImages, []]);
	};
	
	const handleImageUpload = (index: number, files: FileList | null) => {
		if (files && files.length > 0) {
			const images = Array.from(files).map(file => ({
				src: URL.createObjectURL(file),
				key: Date.now()
			}));
			const updatedChapterImages = [...chapterImages];
			updatedChapterImages[index] = [...updatedChapterImages[index], ...images];
			setChapterImages(updatedChapterImages);
		}
	};
	
	const handleChapterChange = (index: number, field: keyof ChapterProps, value: string | image[]) => {
		const updatedChapters = [...chapters];
		if (field === 'subtitle' || field === 'text') {
			updatedChapters[index][field] = value as string;
		} else if (field === 'images') {
			updatedChapters[index][field] = value as image[];
		}
		setChapters(updatedChapters);
	};
	
	const handleQuizSubmit = () => {
		const newQuestion: IQuestion = { title: question, variants, correct: correctIndex };
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
		<div className={styles.container}>
			{step === 1 && (
				<div className={styles.step}>
					<h2>Шаг 1: Свойства карточки</h2>
					<input type="text" placeholder="ID" value={cardProps.id} onChange={(e) => setCardProps({ ...cardProps, id: parseInt(e.target.value) })} className={styles.input} />
					<input type="text" placeholder="Название темы" value={cardProps.name} onChange={(e) => setCardProps({ ...cardProps, name: e.target.value })} className={styles.input} />
					<input type='number' placeholder='Класс' value={cardProps.grade} onChange={(e) => setCardProps({ ...cardProps, grade: e.target.value })} min={9} max={11} className={styles.input} />
					<label className={styles.fileInputLabel}>
						Добавить картинку
						<input type="file" onChange={(e) => setCardProps({ ...cardProps, picture: URL.createObjectURL(e.target.files![0]) })} className={styles.fileInput} />
					</label>
					{cardProps.picture && (
						<img src={cardProps.picture} alt="Preview" className={styles.previewImage} />
					)}
					<div className={styles.buttonContainer}>
						<button onClick={handleCardPropsSubmit} className={styles.button}>Продолжить</button>
					</div>
				</div>
			)}
			
			{step === 2 && (
				<div className={styles.step}>
					<h2>Шаг 2: Свойства материала</h2>
					<input type="text" placeholder="ID материала" value={materialProps.id} onChange={(e) => setMaterialProps({ ...materialProps, id: parseInt(e.target.value) })} className={styles.input} />
					<input type="text" placeholder="Название материала" value={materialProps.title} onChange={(e) => setMaterialProps({ ...materialProps, title: e.target.value })} className={styles.input} />
					{chapters.map((chapter, index) => (
						<div key={index}>
							<input type="text" placeholder="Подзаголовок главы" value={chapter.subtitle} onChange={(e) => handleChapterChange(index, 'subtitle', e.target.value)} className={styles.input} />
							<ReactQuill
								theme="snow"
								modules={{
									toolbar: [
										['bold', 'italic', 'underline', 'strike'],
										[{ 'list': 'ordered'}, { 'list': 'bullet' }],
										['link', 'image'],
										[{ 'color': [] }],
										[{ 'size': ['small', false, 'large', 'huge'] }]
									]
								}}
								formats={[
									'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'color', 'size'
								]}
								value={chapter.text}
								onChange={(value) => handleChapterChange(index, 'text', value)}
								className={styles.textarea}
							/>
							<label className={styles.fileInputLabel}>
								Добавить картинку
								<input type="file" onChange={(e) => handleImageUpload(index, e.target.files)} multiple className={styles.fileInput} />
							</label>
							<div className={styles.imagesContainer}>
								{chapter.images && chapter.images.map((image, imgIndex) => (
									<img key={imgIndex} src={image.src} alt={`Chapter ${index + 1} Image ${imgIndex + 1}`} className={styles.image} />
								))}
							</div>
						</div>
					))}
					<button onClick={handleChapterAdd} className={styles.button}>Добавить подглаву</button>
					<button onClick={handleMaterialPropsSubmit} className={styles.button}>Продолжить</button>
				</div>
			)}
			
			{step === 3 && (
				<div className={styles.step}>
					<h2>Шаг 3: Викторина</h2>
					<input type="text" placeholder="Введите вопрос" value={question} onChange={(e) => setQuestion(e.target.value)} className={styles.input} />
					{variants.map((variant, index) => (
						<div key={index}>
							<input type="text" placeholder="Введите вариант ответа" value={variant} onChange={(e) => handleVariantChange(index, e.target.value)} className={styles.input} />
						</div>
					))}
					<button onClick={handleVariantAdd} className={styles.button__add}>Добавить вариант ответа</button>
					<input type="number" placeholder="Введите индекс правильного варианта ответа" value={correctIndex} onChange={(e) => setCorrectIndex(parseInt(e.target.value))} className={styles.input} />
					<button onClick={handleQuizSubmit} className={styles.button}>Добавить вопрос</button>
					{quiz.map((q, index) => (
						<div key={index}>
							<p>Вопрос: {q.title}</p>
							<p>Варианты ответа: {q.variants.join(', ')}</p>
							<p>Индекс правильного ответа: {q.correct}</p>
						</div>
					))}
					<div className={styles.separator}></div>
					<div className={styles.buttonsContainer}>
						<button onClick={handleSaveCard} className={styles.button}>Закончить заполнение карточки</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateCard;
