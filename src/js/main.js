var winWidth = $(window).width() - 20, // -20 Removes Scroll Bar
    winHeight = $(window).height() - 20, // -20
    screen = $('#screen'),
    corner = "<div class=\"corner\"></div>",
    cornerSize = 150,
    newCornerSize,
    blockWidth = 200,
    blockHeight = 100,
    margin = 20,
    newMargin,
    availableWidth = winWidth - (margin * 2) - (cornerSize * 2),
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

availableHeight = winHeight - (newMargin * 2) - (newCornerSize * 2);
roughVSegments = availableHeight / newWidth;
actualVSeg = Math.floor(roughVSegments);
diffV = availableHeight - Math.ceil(newWidth * actualVSeg);
var newVMargin = newMargin + (diffV/2);
var newVOffSet = newVMargin + newCornerSize;

$(".corner").css({
    "width": newCornerSize,
    "height": newCornerSize
});

$(".top").css("top", newVMargin+"px");
$(".right").css("right", newMargin+"px");
$(".bottom").css("bottom", newVMargin+"px");
$(".left").css("left", newMargin+"px");

// ToDo: rotate blocks CSS Transform?

for (var i = 0; i < actualHSeg; i++) {
    move = offSet + (i * newWidth);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; top:"+newVMargin+"px; left:"+ move + "px;");
    screen.append(block);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; bottom:"+newVMargin+"px; left:"+ move + "px;");
    screen.append(block);
}

for (i = 0; i < actualVSeg; i++) {
    move = newVOffSet + (i * newWidth);
    block = createBlock("width:"+newHeight+"px; height:"+newWidth+"px; left:"+newMargin+"px; top:"+ move + "px;");
    screen.append(block);
    block = createBlock("width:"+newHeight+"px; height:"+newWidth+"px; right:"+newMargin+"px; top:"+ move + "px;");
    screen.append(block);
}

function createBlock(styles) {
    return "<div class=\"block\" style=\""+styles+"\"></div>"
}
