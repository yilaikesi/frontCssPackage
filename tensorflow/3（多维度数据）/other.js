
// House square footage.
const data =    [800, 850, 900, 950, 980, 1000, 1050, 1075, 1100, 1150, 1200, 1250, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];

// Estimated dollar cost of house for each piece of data above (1000x square footage).
const answers = [800000, 850000, 900000, 950000, 980000, 1000000, 1050000, 1075000, 1100000, 1150000, 1200000,  1250000 , 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000];

// Testing data separate from training data.
const dataTest =     [886, 1225, 500];
const answersTest =  [886000, 1225000, 500000];

// Create Tensor representations of our vanilla JS arrays above 
// so can be used to train our model.
const trainTensors = {
  data: tf.tensor2d(data, [data.length, 1]),
  answer: tf.tensor2d(answers, [answers.length, 1])
};

const testTensors = {
  data: tf.tensor2d(dataTest, [dataTest.length, 1]),
  answer: tf.tensor2d(answersTest, [answersTest.length, 1])
};


// Now actually create and define model architecture.
const model = tf.sequential();

// We will use one dense layer with 1 neuron and an input of 
// a single value.
model.add(tf.layers.dense({inputShape: [1], units: 1}));



// Learning rate is essentially how large of a step 
// we take when updating model weights.
const LEARNING_RATE = 0.01;

// Epochs refers to the number of times the model is going to look
// at the dataset that you provide it.
const EPOCHS = 50;

// BatchSize refers to the size of the data subsets that the model 
// will see on each iteration of training.
const BATCH_SIZE = 8;



async function train() { 
  console.log('training...');
  
  // Compile the model.
  // optimizer: This is the algorithm that is going to govern the 
  // updates to the model as it sees examples. There are many optimizers 
  // available in TensorFlow.js.
  // loss: this is a function that will tell the model how well it is 
  // doing on learning each of the batches (data subsets) that it is shown. 
  model.compile({
    optimizer: tf.train.sgd(LEARNING_RATE),
    loss: 'meanAbsoluteError'
  });

  // Finally do the training itself.
  // We also set for the data to be shuffled each time we try 
  // and learn from it.
  // Validation split of 0.2 means we keep 20% of the data reserved 
  // to check the quality of our training to act as "unseen" examples to try.
  let results = await model.fit(trainTensors.data, trainTensors.answer, {
      epochs: EPOCHS,
      batchSize: BATCH_SIZE,
      shuffle: true,
      validationSplit: 0.1
  });
  
  console.log('training complete');
  // Once trained we can evaluate the model.
  evaluate();
}

async function evaluate(stuff) {
  let predValue = 768;
  console.log('Making prediction for ' + predValue + 'sqft');
  
  // Predict answer for a single piece of data.
  let answer = model.predict(tf.tensor1d([predValue]));
  answer.print();
  
  let nonTensorRepresentation = answer.dataSync();
  console.log("sdddddddddd:",nonTensorRepresentation);
 
  
  let result = model.evaluate(testTensors.data, testTensors.answer);
  let testLoss = result.dataSync()[0];
  console.log('Test loss: ' + testLoss);
  await model.save('downloads://my-model');
}