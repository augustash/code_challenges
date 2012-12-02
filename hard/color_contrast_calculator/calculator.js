/*jslint plusplus: true, todo: true, white: true */
/*global jQuery, $, Raphael */

/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function(){
  // Put code here...
  var colorsData = $("#colors").attr('data-color-values');
  var colors = $.parseJSON(colorsData);

  // console.log(colors);

  new ColorContrastCalculator({
    data: colors,
    fgGridHeaderText: "Raised Text Color",
    bgGridHeaderText: "Face Material",
    fontFace: "TuffyRegular, Helvetica, sans-serif",
    textColor: '#363636'
  });

});

/**
 * ColorContrastCalculator
 *
 * draws an interactive grid of colors with a preview area
 * to help determine what foreground/background color combination
 * offers the best contrast and will be compliant with the
 * Americans with Disabilities Act (ADA) requirement of 70%
 * contrast value.
 */
function ColorContrastCalculator(config) {
  // make sure our class is called with our new arguments
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  // keep track of the desired scope
  var self = this;

  /**
   * initialize the Raphael drawing space
   * and parses the data into its major components
   * (i.e., color swatch grids, labels, preview)
   */
  self.init = function() {
    // the data of course
    self.data         = config.data || [];

    /**
     * Raphael canvas options
     */
    // element to render the Raphael canvas to
    self.domID        = config.renderTo || 'output';

    // specify a definite width for the Raphael canvas;
    // otherwise defaults to the width of the containing element (domID)
    self.width        = config.width || $("#" + self.domID).width();

    // specify the definite height for the Raphael canvas
    self.height       = config.height || 540;

    // The actual Raphael canvas object
    self.paper        = Raphael(self.domID, self.width, self.height);

    // the width of the space between columns (global value)
    self.gutter       = config.gutter || 20;

    /**
     * Swatch/Tile options
     */

    // width & height of the swatches/tiles
    self.tileWidth    = config.tileWidth || 36;
    self.tileHeight   = config.tileHeight || 36;

    // number color swatches/tiles per row
    self.tilesPerRow  = config.tilesPerRow || 10;

    // the width of the space/gutter between swatches/tiles
    self.tileGutter   = config.tileGutter || self.gutter * 0.5;

    // the height of the space/gutter between foreground and background grids
    self.gridGutter   = config.gridGutter || self.gutter * 2;

    self.fgGridHeaderText   = config.fgGridHeaderText || 'Foreground Color';
    self.bgGridHeaderText   = config.bgGridHeaderText || 'Background Color';


    /**
     * Font/Text options
     */
    self.fontFace               = config.fontFace || "'Trade Gothic', 'Helvetice Nueue', 'Helvetica', 'Arial', sans-serif";
    self.headerFontSize         = config.headerFontSize || 24;
    self.gridHeaderFontSize     = config.gridHeaderFontSize || self.headerFontSize;
    self.sectionHeaderFontSize  = config.sectionHeaderFontSize || self.headerFontSize * 0.833333;
    self.textFontSize           = config.textFontSize || self.headerFontSize * 0.583333;
    self.textColor              = config.textColor || "#222";

    self.fontAttrs = {
      'fill': self.textColor,
      'stroke': 'transparent',
      'font-family': self.fontFace,
      'text-anchor': 'start'
    };

    /**
     * Preview/Chosen color box options
     */
    self.boxWidth   = config.boxWidth || (self.tileWidth + self.tileGutter) * 6;
    self.boxHeight  = config.boxHeight || self.boxWidth / 2;

    /**
     * ADA guidelines require that copy characters contrast
     * with their background by at least 70%.
     *
     * @see http://www.access-board.gov/adaag/html/adaag.htm
     */
    self.adaMinContrastValue = config.adaMinContrastValue || 70;


    /**
     * complex paths
     */
    self.uncheckedBox = "M26,27.5H6c-0.829,0-1.5-0.672-1.5-1.5V6c0-0.829,0.671-1.5,1.5-1.5h20c0.828,0,1.5,0.671,1.5,1.5v20C27.5,26.828,26.828,27.5,26,27.5zM7.5,24.5h17v-17h-17V24.5z";

    self.checkedBox =  "M29.548,3.043c-1.081-0.859-2.651-0.679-3.513,0.401L16,16.066l-3.508-4.414c-0.859-1.081-2.431-1.26-3.513-0.401c-1.081,0.859-1.261,2.432-0.401,3.513l5.465,6.875c0.474,0.598,1.195,0.944,1.957,0.944c0.762,0,1.482-0.349,1.957-0.944L29.949,6.556C30.809,5.475,30.629,3.902,29.548,3.043zM24.5,24.5h-17v-17h12.756l2.385-3H6C5.171,4.5,4.5,5.171,4.5,6v20c0,0.828,0.671,1.5,1.5,1.5h20c0.828,0,1.5-0.672,1.5-1.5V12.851l-3,3.773V24.5z";

    /**
     * business time! organize the data and draw everything
     */
    self.parseData();
    self.draw();
  };

  /**
   * utility function to separate out the foreground and background
   * colors into their own arrays
   *
   * TODO: what if the foreground and background colors are an array?
   */
  self.parseData = function() {
    self.fgColors = [];
    self.bgColors = [];

    // convert the foreground colors into an array of objects
    $.each(self.data.foreground, function(i, color){
      self.fgColors.push(color);
    });

    // convert the background colors into an array of objects
    $.each(self.data.background, function(i, color){
      self.bgColors.push(color);
    });

    // calculate the number of rows
    self.calculateRowsNeeded();

    // calculate the total height of all grids, headers, etc.
    // so the canvas can be resized to fit
    self.calculateTotalHeight();
  };

  /**
   * calculate how many rows are needed for each grid (background & foreground)
   * by dividing their quantity by the self.tilesPerRow configuration value
   */
  self.calculateRowsNeeded = function() {
    self.fgRows = Math.ceil(self.fgColors.length / self.tilesPerRow);
    self.bgRows = Math.ceil(self.bgColors.length / self.tilesPerRow);
  };

  /**
   * re-calculates the height needed for the canvas to be rendered fully
   * by accounting for grid headers + margins + grid rows and margins
   */
  self.calculateTotalHeight = function() {
    var bgGridHeight, fgGridHeight, gridHeaderHeightWithMargin;

    self.gridHeaderMargin       = (self.gridGutter / 2);

    gridHeaderHeightWithMargin  = self.gridHeaderFontSize + self.gridHeaderMargin;
    bgGridHeight                = (self.tileHeight + self.tileGutter) * self.bgRows;
    fgGridHeight                = (self.tileHeight + self.tileGutter) * self.fgRows;

    self.fgGridHeight           = gridHeaderHeightWithMargin + fgGridHeight;
    self.bgGridHeight           = gridHeaderHeightWithMargin + bgGridHeight;
    self.gridWidth              = ((self.tileWidth + self.tileGutter) * self.tilesPerRow) + self.gridGutter;

    // set the new height of the canvas paper
    self.height = self.fgGridHeight + self.gridGutter + self.bgGridHeight;

    // resize the Raphael canvas to it's new dimensions
    self.paper.setSize(self.width, self.height);
  };

  /**
   * utilty function responsible for drawing the grid of colors
   * for foreground and background colors, chosen color values,
   * and the preview area
   */
  self.draw = function() {
    self.drawSections(self.fgColors, self.drawForegroundColorGrid);
    self.drawSections(self.bgColors, self.drawBackgroundColorGrid);
    self.drawPreview();
  };

  /**
   * == drawSections
   *
   * pass the data onto the appropriate drawing methods
   */
  self.drawSections = function(theArray, drawingCallback) {
    drawingCallback(theArray);
  };

  /**
   * == drawForegroundColorGrid
   *
   * draws the foreground header and grid of swatch colors
   */
  self.drawForegroundColorGrid = function(colors) {
    var gridOffset, gridHeaderYOffset, gridHeaderXOffset, gridWidth;

    gridHeaderXOffset = 0;
    gridHeaderYOffset = self.gridHeaderMargin;
    gridOffset        = self.gridHeaderFontSize + gridHeaderYOffset;

    self.drawGridHeader(self.fgGridHeaderText, gridHeaderXOffset, gridHeaderYOffset);
    self.drawColorGrid(colors, gridOffset);
    self.drawChosenForegroundValues('Typeface Color:', self.gridWidth, gridOffset);
  };

  /**
   * == drawBackgroundColorGrid
   *
   * draws the background header and grid of swatch colors
   */
  self.drawBackgroundColorGrid = function(colors) {
    var gridOffset, gridHeaderYOffset, gridHeaderXOffset;

    gridHeaderXOffset = 0;
    gridHeaderYOffset = self.fgGridHeight + self.gridGutter;
    gridOffset        = gridHeaderYOffset + self.gridHeaderMargin;

    self.drawGridHeader(self.bgGridHeaderText, gridHeaderXOffset, gridHeaderYOffset);
    self.drawColorGrid(colors, gridOffset);
    self.drawChosenBackgroundValues('Face Material:', self.gridWidth, gridOffset);
  };

  /**
   * == drawGridHeader
   *
   * draws the grid's header
   */
  self.drawGridHeader = function(text, xOffset, yOffset) {
    var label = self.paper.text(xOffset + self.tileGutter, yOffset, text);

    // foreground fill for the score #
    label.attr(self.fontAttrs).attr({'font-size': self.gridHeaderFontSize});
  };

  /**
   * == drawChosenForegroundValues
   *
   * draws placeholder text strings for the chosen foreground color's name
   * and LRV values which can be later update through the .attr() methods
   *
   * @param  string     titleText
   * @param  integer    xOffset
   * @param  integer    yOffset
   * @return Element
   */
  self.drawChosenForegroundValues = function(titleText, xOffset, yOffset){
    // draw the box
    self.drawChosenColorValues(titleText, xOffset, yOffset);

    // draw the text placeholders
    self.fgColorNameText   = self.paper.text(xOffset, yOffset + 50, '').attr(self.fontAttrs);
    self.fgColorLRVText    = self.paper.text(xOffset, yOffset + 110, '').attr(self.fontAttrs);

    // update the font size
    self.fgColorNameText.attr({'font-size': self.textFontSize });
    self.fgColorLRVText.attr({'font-size': self.textFontSize * 1.1 });
  };

  /**
   * == drawChosenBackgroundValues
   *
   * draws placeholder text strings for the chosen background color's name
   * and LRV values which can be later update through the .attr() methods
   *
   * @param  string     titleText
   * @param  integer    xOffset
   * @param  integer    yOffset
   * @return Element
   */
  self.drawChosenBackgroundValues = function(titleText, xOffset, yOffset){
    // draw the box
    self.drawChosenColorValues(titleText, xOffset, yOffset);

    // draw the text placeholders
    self.bgColorNameText   = self.paper.text(xOffset, yOffset + 50, '').attr(self.fontAttrs);
    self.bgColorLRVText    = self.paper.text(xOffset, yOffset + 110, '').attr(self.fontAttrs);

    // update the font size
    self.bgColorNameText.attr({'font-size': self.textFontSize });
    self.bgColorLRVText.attr({'font-size': self.textFontSize * 1.1 });
  };


  /**
   * == drawChosenColorValues
   *
   * draws the containing box and titles for a chosen color's name and LRV value
   *
   * @param  string     titleText
   * @param  integer    xOffset
   * @param  integer    yOffset
   * @return Element
   */
  self.drawChosenColorValues = function(titleText, xOffset, yOffset) {
    var box, boxTitle, boxLrvTitle;

    // draw the containing box
    box = self.paper.rect(xOffset - (self.gridGutter / 2), yOffset, self.boxWidth, self.boxHeight);
    box.attr({ fill: '#f5f5f5', stroke: 'transparent' });
    box.glow({ width: 5, opacity: 0.3, color: "#ddd" });

    // draw the titleText and LRV Value text strings
    boxTitle    = self.paper.text(xOffset, yOffset + 30, titleText).attr(self.fontAttrs);
    boxLrvTitle = self.paper.text(xOffset, yOffset + 90, 'LRV Value:').attr(self.fontAttrs);

    boxTitle.attr({ 'font-size': self.textFontSize * 1.1 });
    boxLrvTitle.attr({ 'font-size': self.textFontSize * 1.1 });
  };


  /**
   * == drawPreview
   */
  self.drawPreview = function() {
    var xOffset, yOffset, boxWidth, boxHeight, boxTitle;

    xOffset   = self.gridWidth + self.boxWidth + (self.gridGutter * 2);
    yOffset   = self.gridHeaderMargin;
    boxWidth  = self.boxWidth + (self.tileHeight * 2);
    boxHeight = boxWidth / 2;

    boxTitle  = self.paper.text(xOffset, yOffset, 'Contrast Value:').attr(self.fontAttrs);
    boxTitle.attr({'font-size': self.gridHeaderFontSize});

    // draw the containing box
    self.previewBox  = self.paper.rect(xOffset, yOffset + self.gridHeaderFontSize, boxWidth, boxHeight);
    self.previewBox.attr({ fill: '#f5f5f5', stroke: 'transparent' });
    self.previewBox.glow({ width: 5, opacity: 0.3, color: "#ddd" });

    self.previewText = self.paper.text(xOffset + self.gridHeaderMargin + 60, yOffset + 110, '519');
    self.previewText.attr(self.fontAttrs);
    self.previewText.attr({ 'font-size': self.gridHeaderFontSize * 5, 'font-weight': 'bold' });

    self.contrastValueText = self.paper.text(xOffset + 180, yOffset, '').attr(self.fontAttrs);
    self.contrastValueText.attr({'font-size': self.gridHeaderFontSize });

    // move & stylize the icon indicator
    self.contrastValueIcon = self.paper.path(self.uncheckedBox);
    self.contrastValueIcon.translate(xOffset + 320, yOffset - 16);
    self.contrastValueIcon.attr({ 'stroke': 'transparent', 'fill': "#ddd" });
  };

  /**
   * == drawColorGrid
   *
   * utility function responsible for solely drawing the grid by calculating
   * the x and y offsets and passing that into the self.drawColorSwatch function
   *
   * @param  array    colors      # array of javascript objects
   * @param  integer  gridOffset  # y-offset of where to begin drawing the grid
   */
  self.drawColorGrid = function(colors, gridOffset) {
    var xOffset, yOffset, rows;

    // split the array of colors into smaller arrays
    // so we can draw rows of swatches
    rows = self.chunk(colors, self.tilesPerRow);

    $.each(rows, function(i, row){
      $.each(row, function(j, color){
        xOffset = j * self.tileWidth + (j * self.tileGutter);
        yOffset = i * self.tileHeight + (i * self.tileGutter) + gridOffset;

        self.drawColorSwatch(color, xOffset + self.tileGutter, yOffset);
      });
    });
  };

  /**
   * == drawColorSwatch
   *
   * draws the actual color swatch at the given x and y offsets
   *
   * @param  object     color   # Example: { "name": "Red", "hex": "cc3300", "value": 3 }
   * @param  integer    xOffset
   * @param  integer    yOffset
   * @return Element
   */
  self.drawColorSwatch = function(color, xOffset, yOffset) {
    var swatch;

    // regular rectangle
    swatch = self.paper.rect(xOffset, yOffset, self.tileWidth, self.tileHeight);

    // specify the swatch's fill, stroke, and opacity attributes
    swatch.attr({
      "stroke": 'transparent',
      "fill": "#" + color.hex
    });

    // add a slight drop shadow/glow effect instead of a stroke
    swatch.glow({ width: 5, opacity: 0.3, color: "#aaa" });

    swatch.data('color-name', color.name);
    swatch.data('color-lrv', color.value);
    swatch.data('color-hex', color.hex);

    if (color.category === 1) {
      swatch.data('color-category', 'foreground');
    } else if (color.category === 2) {
      swatch.data('color-category', 'background');
    } else{
      // do nothing
    }

    /**
     * click event
     */
    swatch.click(function(){
      self.handleClickOrTouch(this);
    });

    swatch.touchstart(function(){
      self.handleClickOrTouch(this);
    });

    /**
     * hover event
     */
    $(swatch.node).hover(
      // mouseover effect
      function() {
        swatch.g = swatch.glow({color: "#39c", width: 10, opacity: 0.5 });
      },
      // mouseout effect
      function() {
        swatch.g.remove();
      }
    );
  };

  self.handleClickOrTouch = function(colorSwatch) {
    if (colorSwatch.data('color-category') === 'foreground') {
      self.fgColorNameText.attr({ 'text': colorSwatch.data('color-name') });
      self.fgColorLRVText.attr({ 'text': colorSwatch.data('color-lrv') });
      self.previewText.attr({ 'fill': "#" + colorSwatch.data('color-hex') });
      self.previewText.data('lrv-value', colorSwatch.data('color-lrv'));
    }

    if (colorSwatch.data('color-category') === 'background') {
      self.bgColorNameText.attr({ 'text': colorSwatch.data('color-name') });
      self.bgColorLRVText.attr({ 'text': colorSwatch.data('color-lrv') });
      self.previewBox.attr({ 'fill': "#" + colorSwatch.data('color-hex') });
      self.previewBox.data('lrv-value', colorSwatch.data('color-lrv'));
    }

    // update the LRV contrast value
    self.updateContrastValue();
  };

  /**
   * update the contrast value with the percentage and message
   */
  self.updateContrastValue = function() {
    var  lrvScore, lrvMessage, lrvColor;

    lrvScore = self.calculateContrastValue();

    if (lrvScore >= self.adaMinContrastValue) {
      lrvMessage  = lrvScore + "%";
      lrvColor    = 'green';

      self.contrastValueIcon.attr({ 'path': self.checkedBox, 'fill': lrvColor });

    } else if (lrvScore < self.adaMinContrastValue) {
      lrvMessage  = lrvScore + "%";
      lrvColor    = 'red';

      self.contrastValueIcon.attr({ 'path': self.uncheckedBox, 'fill': "#ddd" });

    } else {
      lrvMessage = '';
      self.contrastValueIcon.attr({ 'path': self.uncheckedBox, 'fill': "#ddd" });
    }

    self.contrastValueText.attr({ 'text': lrvMessage });
  };


  /**
   * calculate the contrast value
   */
  self.calculateContrastValue = function() {
    var fgVal, bgVal, contrast, lrvScore, lrvValue;

    fgVal = self.previewText.data('lrv-value') * 1000;
    bgVal = self.previewBox.data('lrv-value') * 1000;

    if (fgVal > bgVal) {
      contrast = (bgVal / fgVal);
      lrvValue = (contrast * 100) - 100;
      lrvScore = lrvValue < 0 ? Math.round(lrvValue * -1) : Math.round(lrvValue);
    } else if (fgVal < bgVal) {
      contrast = (fgVal / bgVal);
      lrvValue = (contrast * 100) - 100;
      lrvScore = lrvValue < 0 ? Math.round(lrvValue * -1) : Math.round(lrvValue);
    } else {
      lrvScore = undefined;
    }

    return lrvScore;
  };

  /**
   * == chunk
   *
   * utility function to split an array into smaller arrays
   *
   * @see  http://stackoverflow.com/a/11764168/633432
   */
  self.chunk = function(arr, len) {
    var chunks = [], i = 0, n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  };

  // finally, initialize our Color Contrast Calculator
  self.init();
}
