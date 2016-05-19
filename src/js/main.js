var winWidth = $(window).width() - 20, // -20 Removes Scroll Bar
    winHeight = $(window).height() - 20, // -20
    screen = $('#screen'),
    corner = "<div class=\"corner\"></div>",
    cornerSize = 150,
    newCornerSize,
    blockWidth = 200,
    blockHeight = 100,
    maxWidth = 300,
    minWidth = 100,
    margin = 20,
    newMargin = 20,
    availableWidth = winWidth - (margin * 2) - (cornerSize * 2),
    availableHeight = winHeight - (margin * 2) - (cornerSize * 2),
    block,
    roughHSegments,
    diffH,
    diffV,
    roughVSegments,
    ratio,
    actualHSeg,
    actualVSeg,
    offSet = margin + cornerSize,
    newWidth,
    newHeight,
    move;

screen.css({
    "width": winWidth,
    "height": winHeight
});

roughHSegments = availableWidth / blockWidth;
actualHSeg = Math.ceil(roughHSegments);
diffH = roughHSegments / actualHSeg;
newWidth = blockWidth*diffH;
newHeight = blockHeight*diffH;
newCornerSize = cornerSize*diffH;
newMargin = margin + Math.ceil((cornerSize - newCornerSize));

console.log(diffH);

$(".corner").css({
    "width": newCornerSize,
    "height": newCornerSize
});

$(".top").css("top", newMargin+"px");
$(".right").css("right", newMargin+"px");
$(".bottom").css("bottom", newMargin+"px");
$(".left").css("left", newMargin+"px");

for (var i = 0; i < actualHSeg; i++) {
    move = offSet + (i * newWidth);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; top:"+newMargin+"px; left:"+ move + "px;");
    screen.append(block);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; bottom:"+newMargin+"px; left:"+ move + "px;");
    screen.append(block);
}

roughVSegments = availableHeight / blockWidth;
actualVSeg = Math.ceil(roughVSegments);
diffV = roughVSegments / actualVSeg;
newWidth = blockWidth*diffV;
newHeight = blockHeight*diffV;

for (i = 0; i < actualVSeg; i++) {
    move = offSet + (i * newWidth);
    block = createBlock("width:"+newHeight+"px; height:"+newWidth+"px; left:"+newMargin+"px; top:"+ move + "px;");
    screen.append(block);
    block = createBlock("width:"+newHeight+"px; height:"+newWidth+"px; right:"+newMargin+"px; top:"+ move + "px;");
    screen.append(block);
}


function createBlock(styles) {
    return "<div class=\"block\" style=\""+styles+"\"></div>"
}
