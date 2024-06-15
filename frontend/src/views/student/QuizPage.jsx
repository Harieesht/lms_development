import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";

function Quizpage(){

    const [selectedOption,setSelectedOption]=useState("");
    const [quizid,setQuizId]=useState([]);
    const [index,setIndex]=useState(0);
    const [question,setQuestion]=useState("");
    const [choiceA,setChoiceA]=useState("");
    const [choiceB,setChoiceB]=useState("");
    const [choiceC,setChoiceC]=useState("");
    const [choiceD,setChoiceD]=useState("");
    const param=useParams();

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

useEffect(() => {
  const getquiz = async () => {
      try {
        const response=await useAxios().get(`user/subject/quiz/${quizid[index]}`);
        if (response){
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
},[index]);





    


    return (
                <>
                <div class="container">
            <h2>Quiz Application</h2>
            <form>
                <div class="form-group">
                <label for="question1">Question 1:</label>
                <input type="text" class="form-control" id="question1" placeholder="Enter your question" />
                <br/>
                </div>
                <div class="form-group">
                <label for="option1">Option 1:</label>
                <input type="radio" class="" id="option1" name="options" placeholder="Enter option 1" onSelect={()=>setSelectedOption("A")}/>
                
                </div>
                <br/>
                <div class="form-group">
                <label for="option2">Option 2:</label>
                <input type="radio" class="" id="option2" name="options" placeholder="Enter option 2" onSelect={()=>setSelectedOption("B")}/>
                </div>
                <br/>
                <div class="form-group">
                <label for="option3">Option 3:</label>
                <input type="radio" class="" id="option3" name="options" placeholder="Enter option 3" onSelect={()=>setSelectedOption("C")}/>
                </div>
                <br/>
                <div class="form-group">
                <label for="option4">Option 4:</label>
                <input type="radio" class="" id="option4" name="options" placeholder="Enter option 4" onSelect={()=>setSelectedOption("D")}/>
                </div>
                
                
               
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
                </>
    );
}

export default Quizpage;