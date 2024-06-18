import { useState,useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

function Quizpage(){

    const [selectedOption,setSelectedOption]=useState("");
    const [quizid,setQuizId]=useState([]);
    const [index,setIndex]=useState(-1);
    const [question,setQuestion]=useState("");
    const [choiceA,setChoiceA]=useState("");
    const [choiceB,setChoiceB]=useState("");
    const [choiceC,setChoiceC]=useState("");
    const [choiceD,setChoiceD]=useState("");
    const navigate = useNavigate();
    const param=useParams();

    
      


useEffect(() => {
  if (quizid.length > 0){
  
    const getquiz = async () => {
      try {
        const response=await useAxios().get(`user/subject/quiz/${quizid[index]}`);
        if (response){
          setQuestion(response.data.question);
          setChoiceA(response.data.choice_a);
          setChoiceB(response.data.choice_b);
          setChoiceC(response.data.choice_c);
          setChoiceD(response.data.choice_d);
          console.log(response);
        }
        else {
          console.log(response);
        }
      }
      catch (error){
        console.log(error);
      }
  }

  getquiz();
}},[index]);


const getQuizIds = async () => {
  try {
    const response = await useAxios().get(`user/subject/chapterid/${1}`);
    if (response) {
      setQuizId(response.data.chapterquizid);
      
      console.log(response.data.chapterquizid);
    } else {
      console.log(response);
    }
  } catch (error) {
    return error;
  }
  
};


useEffect(() => {
  getQuizIds()
    },[]);


const handleIndex = (e) => {
 
e.preventDefault();

const currentindex=index+1;
setIndex(currentindex);
  
}


const handleSubmit = async (e) =>{
      e.preventDefault();
      const formdata=new FormData();
      formdata.append('selected_option',selectedOption);
      console.log(selectedOption)
      try{
      const response = await useAxios().post(`user/subject/quiz/evaluate/${quizid[index]}`,formdata);
      if (response.status === 201){
        console.log(response)
        if (index <= quizid.length-2){
        const currentindex=index+1;
        setIndex(currentindex);
        setSelectedOption("")
        }
        else if (index === quizid.length-1){
          handleFinalSubmit(e);
        }
      }
      else {
        return {'error' : error}
      }
    }
  
      catch(error){
                  
                  }
}

const handleFinalSubmit = async (e) => {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('chapter_id',1)
  try{
    const response = useAxios().post("user/subject/quiz/evaluate_progress/",formdata);
    if (response.status === 201){
      console.log("Progress percentage have been saved...")
      navigate('');
    }
    else{
      console.log("error");
      navigate('');
    }
  }
  catch(error){
    console.log("error");
  }


}



console.log(quizid[index]);

console.log(question);
console.log(choiceA);
console.log(choiceB);
console.log(choiceC);
console.log(choiceD);
    

    if (index>=0){
    
  
    return (
                <>
                <div class="container">
            <h2>Quiz Application</h2>
            <form>
                <div class="form-group">
                <label for="question1">{question}</label>
                <br/>
                </div>
                <div class="form-group">
                <label for="option1">{choiceA}</label>
                <input type="radio" class="" id="option1" name="options" placeholder="Enter option 1"
                          checked={selectedOption === 'A'} onChange={()=>setSelectedOption("A")}/>
                
                </div>
                <br/>
                <div class="form-group">
                <label for="option2">{choiceB}</label>
                <input type="radio" class="" id="option2" name="options" placeholder="Enter option 2"  
                          checked={selectedOption === 'B'} onChange={()=>setSelectedOption("B")}/>
                </div>
                <br/>
                <div class="form-group">
                <label for="option3">{choiceC}</label>
                <input type="radio" class="" id="option3" name="options" placeholder="Enter option 3"  
                          checked={selectedOption === 'C'} onChange={()=>setSelectedOption("C")}/>
                </div>
                <br/>
                <div class="form-group">
                <label for="option4">{choiceD}</label>
                <input type="radio" class="" id="option4" name="options" placeholder="Enter option 4"  
                          checked={selectedOption === 'D'} onChange={()=>setSelectedOption("D")}/>
                </div>
                
                
               
                <button type="submit" class="btn btn-primary" onClick={ handleSubmit }>Next</button>
            </form>
            </div>
                </>
    );
}
else if(index<0){
  return (
    <>
    <div className='container'>
      <h1>Do you want to start the quiz click below </h1>
    <button type="submit" class="btn btn-primary" onClick={handleIndex}>start</button>
    </div>
    
    
    </>
  )

}
}



export default Quizpage;