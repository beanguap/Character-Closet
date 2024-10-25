const OutfitDetection = () => {
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [predictions, setPredictions] = useState([]);
    const imageRef = useRef(null);
  
    // Load the model when the component mounts
    React.useEffect(() => {
      const loadModel = async () => {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        console.log('Model Loaded');
      };
      loadModel();
    }, []);
  
    // Function to handle image input change
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageURL(imageUrl);
      }
    };
  
    // Function to run detection on the loaded image
    const detectObjects = async () => {
      if (model && imageRef.current) {
        const predictions = await model.detect(imageRef.current);
        setPredictions(predictions);
        console.log('Predictions:', predictions);
      }
    };
  
    return (
      <div>
        <h1>Outfit Detection</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageURL && (
          <div>
            <img
              src={imageURL}
              alt="Uploaded"
              ref={imageRef}
              onLoad={detectObjects}
              style={{ maxWidth: '500px', margin: '20px 0' }}
            />
          </div>
        )}
        <div>
          {predictions.map((prediction, index) => (
            <div key={index}>
              <strong>{prediction.class}</strong> - Confidence: {(prediction.score * 100).toFixed(2)}%
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OutfitDetection;
  