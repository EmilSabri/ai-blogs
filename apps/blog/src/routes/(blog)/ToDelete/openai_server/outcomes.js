// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */

// USED JUST FOR TESTING
const prompt = `Imagine an you’re expert doctor writing an article for a website.
The website is about brain fog for people who experience brain fog.
Each article will have a title, description, and content.
The content typically has short headers, less than 6 words, describing each paragraph and the paragraphs should be about 3 to 4 sentences long.
The article’s content should have around 500 words in it. Now give me an article based on these keywords "what is brain fog"`

const resp = `Title: What is Brain Fog? 

Description: Brain fog is a common phenomenon that can affect people of all ages. Learn what it is, what causes it, and how to manage it. 

Content: 

What Is Brain Fog? 
Brain fog is a term used to describe feelings of confusion, difficulty concentrating, and forgetfulness. It can be experienced by anyone and can vary in intensity. 

What Causes Brain Fog? 
Brain fog can be caused by a variety of factors including stress, lack of sleep, poor nutrition, and certain medications. Other potential causes include hormonal imbalances, allergies, and underlying health conditions such as depression or anxiety. 

How to Manage Brain Fog? 
There are several ways to help manage brain fog. These include getting regular exercise, practicing relaxation techniques such as yoga or meditation, eating a balanced diet, getting enough sleep, and avoiding stress. It’s also important to talk to your doctor if you think an underlying health condition may be causing your brain fog. 

If you experience brain fog on a regular basis, it’s important to talk to your doctor so they can determine the underlying cause and recommend the best treatment plan for you. With the right lifestyle changes and treatment plan, you can manage brain fog and improve your cognitive functioning.`


// Successive prompts and responses
// Experiment - Once gpt gives the response. Ask for a detailed description of 4 sentences of each header. Remove this before trying it out.
// Or try chain of thought prompting
const prompt1 = `Imagine you’re an expert doctor writing an article for a website.
The website is about brain fog, remedies to brain fog, supplements, and general information related to brain fog.
Each article will have a title, description, and content.
The content typically has short headers, less than 6 words, describing each paragraph.
Write an article based on these keywords "What is brain fog"`

const resp1 = `Title: What is Brain Fog? 

Description: Brain fog can be a confusing and difficult condition to live with. Learn what brain fog is, and what you can do to help alleviate its symptoms.

Content: 

What is Brain Fog? 
Brain fog is a term used to describe a condition of mental confusion and difficulty concentrating. It can be characterized by a lack of focus, difficulty remembering things, and a lack of mental clarity. Brain fog can also lead to fatigue, difficulty making decisions, and difficulty completing tasks.

Causes of Brain Fog
Brain fog can be caused by a variety of things, including stress, anxiety, sleep deprivation, poor diet, dehydration, and certain medications. It can also be caused by medical conditions such as hypothyroidism or depression. Brain fog can even occur in otherwise healthy individuals when they are under a great deal of stress.

Symptoms of Brain Fog
The symptoms of brain fog vary from person to person but some of the most common symptoms include memory problems, difficulty concentrating, feelings of confusion and disorientation, difficulty making decisions, fatigue, and difficulty thinking clearly. 

Treating Brain Fog 
The first step in treating brain fog is to identify any underlying health issues that may be contributing to the condition. If any medical conditions are found to be causing the brain fog, it is important to address these conditions first. Additionally, managing stress levels and making lifestyle changes such as getting adequate sleep and eating a balanced diet can help reduce the symptoms of brain fog. Taking supplements such as omega-3 fatty acids or B-complex vitamins may also help reduce symptoms. Finally, talking to a mental health professional such as a psychologist or psychiatrist can also help manage the symptoms of brain fog. 

Conclusion 
Brain fog can be a confusing and difficult condition to live with. By understanding what causes it and what symptoms are associated with it, it is possible to make lifestyle changes that can help reduce its symptoms. Additionally, talking to a health professional or taking supplements may also be beneficial for managing brain fog over the long term.`

const prompt2 = ``