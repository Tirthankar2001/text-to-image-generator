const{Configuration,OpenAIApi}=require("openai")

const configuration =new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai=new OpenAIApi(configuration);



const generateimage=async(req,res)=>{
    try {

        const {prompt,size}=req.body;
        var imagesize='';

        if (size==='small') {
             imagesize='256x256';
        } else if(size==='medium') {
             imagesize='512x512';
        }
        else
        {
            imagesize='1024x1024';
        }



        const response=await openai.createImage({
            prompt,
            n:1,
            size:imagesize
        });
        const imageurl=response.data.data[0].url;

        res.status(200).json({
            success:true,
            data:imageurl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            success:false,
            error:'image could not be generated'
        })
    }
}
module.exports={generateimage};