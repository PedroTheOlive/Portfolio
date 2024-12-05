const active = d3.select("#currentPage").attr("name");
const pages = ["Home", "Projects", "Skills"];

for(i in pages){
    if(pages[i] == active){
        d3.select("#"+pages[i]).style("color", "rgb(255, 0, 255)");
    }
}