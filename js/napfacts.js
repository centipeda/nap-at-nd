var myQuotes = new Array();
myQuotes[0] = "Low sleep quality correlates with low GPA. <a href='https://www.ncbi.nlm.nih.gov/pubmed/20864434/'> [Source]</a>";
myQuotes[1] = "Sleep problems correlate with impeded learning, especially poorer declarative and procedural learning, neurocognitive performance, and academic success.<a href='https://www.ncbi.nlm.nih.gov/pubmed/20864434/'> [Source]</a>";
myQuotes[2] = "Poor sleep can cause chronic fatigue, depression, stress, lower optimism, anxiety, and a lower quality of life.<a href='https://www.ncbi.nlm.nih.gov/pubmed/20864434/> [Source]</a>";
myQuotes[3] = "Poor sleep correlates with obsessive–compulsive symptoms, somatization, depression, and anxiety.<a href='https://www.ncbi.nlm.nih.gov/pubmed/20864434/'> [Source]</a>";
myQuotes[4] = "From the perspective of behavioral improvement, a nap is as good as a night of sleep for learning a perceptual task.<a href='https://www.nature.com/articles/nn1078'> [Source]</a>";
myQuotes[5] = "Naps improve declarative memory (your memory of facts and events).<a href='https://www.sciencedirect.com/science/article/pii/S1074742706000347'> [Source]</a>";
myQuotes[6] = "In a survey of over 1,125 students aged 17 to 24 years from an urban Midwestern university, over 60% were found to suffer from a poor sleep quality according to the PSQI.<a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC55368'> [Source]</a>";
myQuotes[7] = "A study at NASA on sleepy military pilots and astronauts found that a 40-minute nap improved performance by 34% and alertness 100%.<a href='https://www.sleepfoundation.org/articles/napping'> [Source]</a>";

var myRandom = Math.floor(Math.random()*myQuotes.length);

$('#myQuote').html(myQuotes[myRandom]);