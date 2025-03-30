import React from "react";
import { Container, JobPost } from "@/components";

const FeedContent = () => {
  return (
    <>
      <Container className="w-full relative grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((_,index:number)=>{
          return (
            <JobPost key={`feed-${index}`}/>
          )
        })}
      </Container>
    </>
  );
};

export default FeedContent;
