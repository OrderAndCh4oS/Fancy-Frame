var winWidth = $(window).width(),
    winHeight = $(window).height(),
    screen = $('#screen'),
    cornerSize = 30,
    newCornerSize,
    blockWidth = 10,
    blockHeight = 10,
    minMargin = 20,
    newMargin,
    newVMargin,
    availableWidth = winWidth - (minMargin * 2) - (cornerSize * 2),
    block,
    roughHSegments,
    diffH,
    diffV,
    roughVSegments,
    actualHSeg,
    actualVSeg,
    offSet = minMargin + cornerSize,
    newVOffSet,
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
newWidth = Math.ceil(blockWidth*diffH);
newHeight = Math.ceil(blockHeight*diffH);

newCornerSize = Math.ceil(cornerSize*diffH);
newMargin = Math.ceil(minMargin + (cornerSize - newCornerSize));

availableHeight = winHeight - (newMargin * 2) - (newCornerSize * 2);
roughVSegments = availableHeight / newWidth;
actualVSeg = Math.floor(roughVSegments);
diffV = availableHeight - newWidth * actualVSeg;
newVMargin = Math.ceil(newMargin + (diffV/2));
newVOffSet = newVMargin + newCornerSize;

var corner = $(".corner");

corner.css({
    "width": newCornerSize,
    "height": newCornerSize
}).each(function (index) {
    var rotate = index * 90;
    $(this).css("transform", "rotate("+rotate+"deg)");
});

$(".top").css("top", newVMargin+"px");
$(".right").css("right", newMargin+"px");
$(".bottom").css("bottom", newVMargin+"px");
$(".left").css("left", newMargin+"px");

// ToDo: rotate blocks CSS Transform?

for (var i = 0; i < actualHSeg; i++) {
    move = Math.ceil(offSet + (i * newWidth));
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; top:"+newVMargin+"px; left:"+ move + "px; transform: rotate(0deg);");
    screen.append(block);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; bottom:"+newVMargin+"px; left:"+ move + "px; transform: rotate(180deg);");
    screen.append(block);
}

for (i = 0; i < actualVSeg; i++) {
    move = newVOffSet + (i * newWidth);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; right:"+newMargin+"px; top:"+ move + "px; transform: rotate(90deg);");
    screen.append(block);
    block = createBlock("width:"+newWidth+"px; height:"+newHeight+"px; left:"+newMargin+"px; top:"+ move + "px; transform: rotate(270deg);");
    screen.append(block);
}

function createBlock(styles) {
    return "<div class=\"block\" style=\""+styles+"\"></div>"
}
