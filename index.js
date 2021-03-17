let req = new XMLHttpRequest()
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

let w = 1400
let h = 600
let padding = 60

let xScale
let yScale

let data = []
let values
let baseTemp
let minYear
let maxYear
let temp
let variance

let svg = d3.select("body")


let generateCanvas = ()=>{
  svg = svg.append("svg")
  .attr("width", w)
  .attr("height", h)
  
}

let generateScales = ()=>{
 xScale = d3.scaleLinear().range([padding, w-padding]).domain([d3.min(values, (item)=> item["year"]), d3.max(values, (item)=>item["year"]+1)])
  
 yScale = d3.scaleTime().range([padding, h-padding-100]).domain([new Date(0,0,0,0,0,0,0), new Date(0,12,0,0,0,0,0)])
  
}

let generateAxes = ()=>{
  let xAxis = d3.axisBottom(xScale)
  .tickFormat(d3.format("d"))
  svg.append("g")
  .call(xAxis)
  .attr("transform", "translate(0," + (h-padding-1-100) + ")")
  .attr("id", "x-axis")
  
  let yAxis = d3.axisLeft(yScale)
  .tickFormat(d3.timeFormat("%B"))
  svg.append("g")
  .call(yAxis)
  .attr("transform", "translate(" + (padding) + ",-1)")
  .attr("id", "y-axis")
  
  
}

let drawMaps = ()=>{

  svg.selectAll("rect")
  .data(values)
  .enter()
  .append("rect")
  .attr("class", "cell")
  .attr("data-month", (item)=>item["month"]-1)
  .attr("data-year", (item)=>item["year"])
  .attr("data-temp", (item)=>baseTemp + item["variance"])
  .attr("height", (h-(padding*2)-100)/12)
  .attr("y", (item)=>{
    return yScale(new Date(0, item["month"]-1, 0, 0, 0, 0, 0))
  })
  .attr("width", (item)=>{
let numberOfYears = d3.max(values, (item)=>item["year"]) - d3.min(values, (item)=>item["year"])
return (w-(padding*2))/numberOfYears})
  .attr("x", (item)=>{
    return xScale(item["year"])+1})
  .attr("fill", (item)=>{
    if(baseTemp + item["variance"] <= 7.2 && baseTemp + item["variance"]>= 6.1){
      return "#EBF5FB"
    } else if(baseTemp + item["variance"] < 6.1 && baseTemp + item["variance"]>= 5){
      return "#AED6F1"
    } else if(baseTemp + item["variance"] < 5 && baseTemp + item["variance"]>= 3.9){
      return "#2E86C1"
    } else if(baseTemp + item["variance"] < 3.9 && baseTemp + item["variance"]>= 2.8){
      return "#2874A6"
    } else if(baseTemp + item["variance"] < 8.3 && baseTemp + item["variance"]>= 7.2){
      return "#FCF3CF"
    } else if(baseTemp + item["variance"] < 9.5 && baseTemp + item["variance"]>= 8.3){
      return "#F8C471"
    } else if(baseTemp + item["variance"] < 10.6 && baseTemp + item["variance"]>= 9.5){
      return "#E67E22"
    } else if (baseTemp + item["variance"] < 11.7 && baseTemp + item["variance"]>= 10.6){
      return "#CB4335"
    } else if(baseTemp + item["variance"] <= 12.8 && baseTemp + item["variance"]>= 11.7){
      return "#922B21"
    } else if(baseTemp + item["variance"] > 12.8){
      return "#641E16"
    } else {
      return "#512E5F"
    }
  })
  
  .on("mouseover", function(item, i){
    
    if(i['variance']<0){
      variance =i['variance'].toFixed(2)
    }else{
      variance = "+" + i['variance'].toFixed(2)
    }
    
    temp = baseTemp + i["variance"]
    d3.select(this).transition().duration(50).style("stroke", "black").style("stroke-width", 2);
    
    div.transition().duration(50)
    .style("opacity", .85)
    
      div.html(i["year"] + " - " + month[i["month"]-1] + "<br>" + "Temp: " + temp.toFixed(2) + "°C" + "<br>" + "Variance: " + variance + "°C")
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY + 10) + "px")
    .attr("data-year", i["year"])
  })
  .on("mouseout", function(item, i){
    d3.select(this).transition().duration(50).style("stroke", "none")
    
    div.transition().duration(50)
    .style("opacity", 0)
  })
 
let div = d3.select("body").append("div")
  .attr("id", "tooltip")
  .attr("opacity", 0)

let month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
}

let subinfo = ()=>{
 
  let legend = svg.append("g")
  .attr("x", 10)
  .attr("y", 570)
  .attr("height", 50)
  .attr("width", 100)
  .attr("id", "legend")
  
  legend.append("rect")
  .attr("x", 10)
  .attr("y", 500)
  .attr("fill", "#512E5F")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 110)
  .attr("y", 500)
  .attr("fill", "#2874A6")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 210)
  .attr("y", 500)
  .attr("fill", "#2E86C1")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 310)
  .attr("y", 500)
  .attr("fill", "#AED6F1")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 410)
  .attr("y", 500)
  .attr("fill", "#EBF5FB")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
 
  legend.append("rect")
  .attr("x", 510)
  .attr("y", 500)
  .attr("fill", "#FCF3CF")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 610)
  .attr("y", 500)
  .attr("fill", "#F8C471")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 710)
  .attr("y", 500)
  .attr("fill", "#E67E22")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 810)
  .attr("y", 500)
  .attr("fill", "#CB4335")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 910)
  .attr("y", 500)
  .attr("fill", "#922B21")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("rect")
  .attr("x", 1010)
  .attr("y", 500)
  .attr("fill", "#641E16")
  .attr("stroke", "black")
  .attr("height", 50)
  .attr("width", 100)
  
  legend.append("text")
  .text("Below 2.8°C")
  .attr("x", 20)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("2.8°C ~ 3.9°C")
  .attr("x", 120)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("3.9°C ~ 5.0°C")
  .attr("x", 220)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("5.0°C ~ 6.1°C")
  .attr("x", 320)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("6.1°C ~ 7.2°C")
  .attr("x", 420)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("7.2°C ~ 8.3°C")
  .attr("x", 520)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("8.3°C ~ 9.5°C")
  .attr("x", 620)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("9.5°C ~ 10.6°C")
  .attr("x", 720)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("10.6°C ~ 11.7°C")
  .attr("x", 820)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("11.7°C ~ 12.8°C")
  .attr("x", 920)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
  
  legend.append("text")
  .text("12.8C+")
  .attr("x", 1020)
  .attr("y", 570)
  .attr("class", "indicator")
  .attr("fill", "white")
}



req.open("GET", url, true)
req.onload = ()=>{
  data = JSON.parse(req.responseText)
  values = data["monthlyVariance"]
  baseTemp = data["baseTemperature"]
  console.log(data)
  console.log(values)
  console.log(baseTemp)
  
  generateCanvas()
  generateScales()
  generateAxes()
  drawMaps()
  subinfo()
  
  
}
req.send();