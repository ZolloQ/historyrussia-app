import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { CardProps } from '../../components/Card/Card.props';
import type { ChapterProps, MaterialProps } from '../../components/Material/Material.props';
import { imageActions } from '../../redux/slice/UploadImage';
import styles from './CreateCard.module.scss';
import { IQuestion } from '../../interfaces/Quiz.interfaces';
import { useUploadImageMutation, usePostUploadCardMutation } from '../../redux/api/api';

const CreateCard: React.FC = () => {
	const { step1 } = useSelector((state: { image: any }) => state.image);
	const [selectedImageNames, setSelectedImageNames] = useState<string[]>([]);
	const [selectedImageURLs, setSelectedImageURLs] = useState<string[]>([]);
	const [step, setStep] = useState<number>(1);
	const [cardProps, setCardProps] = useState<CardProps>({
		id: 0,
		name: '',
		grade: 0,
		picture: new File([], ''),
	});
	const [materialProps, setMaterialProps] = useState<MaterialProps>({
		title: '',
		chapters: [],
	});
	const [chapters, setChapters] = useState<ChapterProps[]>([]);
	const [chapterImages, setChapterImages] = useState<File[][]>([]);
	const [chapterImageURLs, setChapterImageURLs] = useState<string[][]>([]);
	const [quiz, setQuiz] = useState<IQuestion[]>([]);
	const [question, setQuestion] = useState<string>('');
	const [variants, setVariants] = useState<string[]>([]);
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	const [uploadImage] = useUploadImageMutation();
	const [uploadCard] = usePostUploadCardMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleSaveCard = async () => {
		try {
			const chapterData = chapters.map((chapter, index) => ({
				subtitle: chapter.subtitle,
				text: chapter.text,
				images: chapterImages[index], // Ссылки на изображения для каждой главы
			}));
			
			const cardData = {
				step1: {
					name: cardProps.name,
					grade: cardProps.grade,
					picture: step1[0],
				},
				step2: {
					title: materialProps.title,
					chapters: chapterData, // Использование массива chapterData
				},
				quiz: quiz.map(q => ({
					title: q.title,
					variants: q.variants,
					correct: q.correct,
				})),
			};
			await uploadCard(cardData).unwrap();
			navigate('/');
		} catch (error) {
			console.error('Error saving card:', error);
		}
	};
	
	const handleSaveImage = async (files: FileList | null) => {
		if (files && files.length > 0) {
			const picture = Array.from(files);
			const updatedChapterImages = [...chapterImages];
			setChapterImages(updatedChapterImages);
			const imageNames = picture.map(image => image.name);
			setSelectedImageNames([...selectedImageNames, ...imageNames]);
			const imageURLs = picture.map(image => URL.createObjectURL(image));
			setSelectedImageURLs([...selectedImageURLs, ...imageURLs]);
			try {
				for (let i = 0; i < picture.length; i++) {
					const formData = new FormData();
					formData.append('image', picture[i]);
					const image = formData.get('image') as { name: string, size: number, type: string };
					if (image != null) {
						console.log(image);
					}
					const res = await uploadImage(formData);
					// @ts-ignore
					dispatch(imageActions.saveImageName({ name: res.data.data.name, step: 1 }));
					console.log(res);
				}
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};
	
	const handleContinue = () => {
		setStep(step + 1);
	};
	
	const handleBack = () => {
		setStep(step - 1);
	};
	
	const handleChapterAdd = () => {
		const newChapter: ChapterProps = { subtitle: '', text: '', image: [] };
		setChapters([...chapters, newChapter]);
		setChapterImages([...chapterImages, []]);
		setChapterImageURLs([...chapterImageURLs, []]);
	};
	
	const handleImageUpload = async (index: number, files: FileList | null) => {
		if (files && files.length > 0) {
			const images = Array.from(files);
			const tempChapterImages = [...chapterImages];
			const tempChapterImageURLs = [...chapterImageURLs]; // Temporary array for chapter image URLs
			
			try {
				for (let i = 0; i < images.length; i++) {
					const formData = new FormData();
					formData.append('image', images[i]);
					const res = await uploadImage(formData);
					// @ts-ignore
					const imageName = res.data.data.name; // Получение имени изображения из ответа сервера
					dispatch(imageActions.saveImageName({ name: imageName, step: 2 })); // Сохранение имени изображения в хранилище
					tempChapterImages[index] = [...tempChapterImages[index], imageName]; // Добавление имени изображения во временный массив
					tempChapterImageURLs[index] = [...tempChapterImageURLs[index], URL.createObjectURL(images[i])]; // Добавление URL изображения
				}
				
				setChapterImages(tempChapterImages);
				setChapterImageURLs(tempChapterImageURLs); // Update state with new image URLs
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};
	
	const handleChapterChange = (index: number, field: keyof ChapterProps, value: string | File[]) => {
		const updatedChapters = [...chapters];
		if (field === 'subtitle' || field === 'text') {
			updatedChapters[index][field] = value as string;
		} else if (field === 'image') {
			if (Array.isArray(value)) {
				updatedChapters[index][field] = value as File[];
			} else {
				console.error('Invalid value type for images field');
			}
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
					<h2>Шаг 1: Внешний вид карточки</h2>
					<input
						type='text'
						placeholder='Название темы'
						value={cardProps.name}
						onChange={(e) => setCardProps({ ...cardProps, name: e.target.value })}
						className={styles.input}
					/>
					<input
						type='number'
						placeholder='Класс'
						value={cardProps.grade}
						onChange={(e) => setCardProps({
							...cardProps,
							grade: parseInt(e.target.value)
						})}
						min={9}
						max={11}
						className={styles.input}
					/>
					<label className={styles.fileInputLabel}>
						Добавить изображение
						<input
							type='file'
							onChange={(e) => handleSaveImage(e.target.files)}
							className={styles.fileInput}
						/>
					</label>
					<div className={styles.imagesContainer}>
						{selectedImageURLs.map((url, index) => (
							<img key={index} src={url} alt={`Selected ${index}`} className={styles.previewImage} />
						))}
					</div>
					<div className={styles.buttonContainer}>
						<button onClick={handleContinue} className={styles.button}>
							Продолжить
						</button>
					</div>
				</div>
			)}
			{step === 2 && (
				<div className={styles.step}>
					<h2>Шаг 2: Свойства материала</h2>
					<input
						type='text'
						placeholder='Заголовок главы'
						value={materialProps.title}
						onChange={(e) => setMaterialProps({ ...materialProps, title: e.target.value })}
						className={styles.input}
					/>
					{chapters.map((chapter, index) => (
						<div key={index}>
							<input
								type="text"
								placeholder="Подзаголовок главы"
								value={chapter.subtitle}
								onChange={(e) => handleChapterChange(index, 'subtitle', e.target.value)}
								className={styles.input}
							/>
							<ReactQuill
								theme="snow"
								modules={{
									toolbar: [
										['bold', 'italic', 'underline', 'strike'],
										[{ list: 'ordered' }, { list: 'bullet' }],
										['link', 'image'],
										[{ color: [] }],
										[{ size: ['small', false, 'large', 'huge'] }],
									],
								}}
								formats={[
									'bold',
									'italic',
									'underline',
									'strike',
									'list',
									'bullet',
									'link',
									'image',
									'color',
									'size',
								]}
								value={chapter.text}
								onChange={(value) => handleChapterChange(index, 'text', value)}
								className={styles.textarea}
							/>
							<label className={styles.fileInputLabel}>
								Добавить изображение
								<input
									type="file"
									onChange={(e) => handleImageUpload(index, e.target.files)}
									multiple
									className={styles.fileInput}
								/>
							</label>
							<div className={styles.imagesContainer}>
								{chapterImageURLs[index] && chapterImageURLs[index].map((url, imgIndex) => (
									<img key={imgIndex} src={url} alt={`Chapter ${index} Image ${imgIndex}`} className={styles.previewImage} />
								))}
							</div>
						</div>
					))}
					<button onClick={handleChapterAdd} className={styles.button}>
						Добавить главу
					</button>
					<div className={styles.buttonContainer}>
						<button onClick={handleBack} className={styles.button}>
							Назад
						</button>
						<button onClick={handleContinue} className={styles.button}>
							Продолжить
						</button>
					</div>
				</div>
			)}
			{step === 3 && (
				<div className={styles.step}>
					<h2>Шаг 3: викторина</h2>
					<input
						type="text"
						placeholder="Ввести вопрос"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						className={styles.input}
					/>
					{variants.map((variant, index) => (
						<div key={index}>
							<input
								type="text"
								placeholder="Ввести вариант ответа"
								value={variant}
								onChange={(e) => handleVariantChange(index, e.target.value)}
								className={styles.input}
							/>
						</div>
					))}
					<button onClick={handleVariantAdd} className={styles.button__add}>
						Добавить вариант ответа
					</button>
					<input
						type="number"
						placeholder="Введите индекс правильного варианта ответа"
						value={correctIndex}
						onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
						className={styles.input}
					/>
					<button onClick={handleQuizSubmit} className={styles.button}>
						Добавить вопрос
					</button>
					{quiz.map((q, index) => (
						<div key={index}>
							<p>Вопрос: {q.title}</p>
							<p>Варианты ответов: {q.variants.join(', ')}</p>
							<p>Индекс правильного варианта ответа: {q.correct}</p>
						</div>
					))}
					<div className={styles.separator}></div>
					<div className={styles.buttonContainer}>
						<button onClick={handleBack} className={styles.button}>
							Назад
						</button>
						<button onClick={handleSaveCard} className={styles.button}>
							Закончить создание карточки
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateCard;
