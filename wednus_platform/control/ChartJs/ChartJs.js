/**
 * \file ChartJs.js
 * Porting for Chart.js
 *
 * Engoy!
 * @author Sundew Shin
 * @todo implement the rest of chart types
 * @note change name through 'Find/Replace'
 * @see http://www.chartjs.org/
 */


/**
 * ChartJs Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.ChartJs = function(args){args = args?args:{}; var self = this;
  // control info.
  this.name = 'ChartJs';
  this.version = '0.0.1';

  // handle arguments
  this.wps = args.wps?args.wps:'80%,80%,xcenter:0,ycenter:0';
  this.core = document.createElement('canvas');
  //this.core.setAttribute('id', 'canvas');
  this.core.id = 'canvas';
  //this.core.className = this.lang;
  //this.core.value = this.code;
  this.core.style.width = '100%';
  this.core.style.height = '100%';
  this.body = document.createElement('div');

  // *will be called once when window.onload fires
  // cond: it needs to be added to WPS by 'W.add'
  this.onload = function(){
    var chart = new Chart(self.core.getContext("2d"), {
      type: args.type,
      data: args.data,
      options: args.options,
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    });
    window.myHorizontalBar = chart;
    // add control panel
    if(args.control == true){
      // local utility functions
      var MONTHS = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      var randomScalingFactor = function() {
        return (Math.random()>0.5?1.0:-1.0)*Math.round(Math.random()*100);
      };
      var randomColorFactor = function() {
        return Math.round(Math.random()*255);
      };
      var randomColor = function() {
        return 'rgba('+randomColorFactor()+','+randomColorFactor()+','
          +randomColorFactor()+',.7)';
      };
      // add buttons
      function addButtons(txt, func){
        var btn = document.createElement('button');
        btn.addEventListener('click', func);
        var t = document.createTextNode(txt);
        btn.appendChild(t);
        self.body.appendChild(btn);
      };
      
      function randomGen(type){
        var rendObj = randomScalingFactor();
        switch (type){
          case 'horizontalBar':
            var zero = Math.random()<0.2?true:false;
            return zero ? 0.0 : randomScalingFactor();
          case 'bubble':
            return {
              x: randomScalingFactor(),
              y: randomScalingFactor(),
              r: Math.abs(randomScalingFactor()) / 5
            };
          case 'line':
            //alert(W.serialize(chart));
    				var lastTime = chart.scales['x-axis-0'].labelMoments[0].length ? chart.scales['x-axis-0'].labelMoments[0][chart.scales['x-axis-0'].labelMoments[0].length - 1] : Date.now();
    				var newTime = lastTime.clone().add(1, 'day').format('MM/DD/YYYY HH:mm');
            return {
						  x: newTime,
						  y: randomScalingFactor()
					  }
        };
      };
      
      addButtons('Randomize Data', function(){
        $.each(args.data.datasets, function(i, dataset){
          if(args.type == 'line'){  
    				$.each(dataset.data, function(j, dataObj) {
    					dataObj.y = randomScalingFactor();
    				});
            chart.update();
            return;
          };
          //alert(W.serialize(chart.datasets));
          dataset.backgroundColor = randomColor();
          dataset.data = dataset.data.map(function(){
            return randomGen(args.type);
          });
        });
        chart.update();
      });
      addButtons('Add Data', function(){
        if (args.data.datasets.length > 0){
          var month = MONTHS[args.data.labels.length % MONTHS.length];
          if(args.type != 'line'){
            args.data.labels.push(month);
          };
          for (var index = 0; index < args.data.datasets.length; ++index){
            args.data.datasets[index].data.push(randomGen(args.type));
          }
          chart.update();
        }
      });
      addButtons('Remove Data', function(){
        args.data.labels.splice(-1, 1); // remove the label first
        args.data.datasets.forEach(function (dataset, datasetIndex){
          dataset.data.pop();
        });
        chart.update();
      });
      // ignore adding dataset buttons for 'line' type graph
      if(args.type == 'line') return;
      addButtons('Add Dataset', function(){
        var newDataset = {
          label: 'Dataset '+args.data.datasets.length,
          backgroundColor: randomColor(),
          data: []
        };
        for (var index = 0; index<args.data.labels.length; ++index){
          newDataset.data.push(randomGen(args.type));
        }
        args.data.datasets.push(newDataset);
        chart.update();
      });
      addButtons('Remove Dataset', function(){
        args.data.datasets.splice(0, 1);
        chart.update();
      });
    };
  };
  W.add(this);
};

//! \cond   loadModules
// load external modules
W.include_css('control/ChartJs/lib', 'canvas');
W.include('control/ChartJs/lib', 'moment.min,jquery.min,Chart.bundle');
//W.js();
//W.css();
//W.load();
W.module('scavenger');
//W.include('control/ChartJs/lib', 'dummy');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.ChartJs = {};
//W.c.ChartJs.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example ChartJs.html <a href='../../test/ChartJs.html'>Run this code</a>
 */

/**
 * @example CodeExample.html <a href='../../test/CodeExample.html'>Run this code</a>
 */


/**
 * \mainpage
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test <a href='../../test/ChartJs.html'>ChartJs.html</a> (unit tests)
 *<hr>
 *
 * \section req Requirement
 * - wednus.js
 *
 *<hr>
 *
 * \section structure Structure
 * ChartJs is a type1 control.
 * <br>(we highly recommend you to use <a href='http://www.umlet.com/'>UMLet</a> for <a href='http://eclipse.org'>Eclipse</a> env.)
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('ChartJs');
 * \endcode
 * <br>
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myChartJs = new W.ChartJs();
 * \endcode
 * @param args (param desc. goes here)
 *
 * <br>
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * alert(myChartJs.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will print 'control name: ChartJs', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('ChartJs');
 * </script>
 *
 * <script type='text/javascript'>
 * var myChartJs = new W.ChartJs();
 * document.write('control name: '+ myChartJs.name);
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do NOT merge script blocks into one because each block is
 * closure.
 *
 * <hr>
 *
 * \section author Author
 * (your name & contact info)
 *<hr>
 *
 * \section license License
 * This section describes the license this destribution is destributed under. You
 * may choose an <a href='http://opensource.org/licenses/'>OSI Approved License</a>.
 * The most common option in Open Source today is the <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>,
 * however, one of the most flexible is the <a href='http://opensource.org/licenses/artistic-license.php'>Artistic License</a>.
 * The Perl programming language is distributed under both licenses, which is
 * perfectly optional.
 */

  /**
 * \page release Release Note
 * \section v0_0_1 v0.0.1
 * - (please list version info here)
 */