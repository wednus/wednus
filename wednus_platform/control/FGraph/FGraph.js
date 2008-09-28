/**
 * \file FGraph.js
 * This file contains the FGraph class definition.
 *
 * @author Sundew H. Shin
 * @see http://www.kylescholz.com/blog/2006/06/first_whack_at_javascript_visu.html
 * @see http://kylescholz.com/cgi-bin/projects/wordnet/query.pl?word=test
 */


/**
 * FGraph Constructor
 *
 * This is the Wednus control wrap of the Force Directed Graphs in
 * Javascript by Kyle Scholz.
 * @param hideFirst true to hide graph first. otherwise, false.
 * @param wps WPS data
 */
W.FGraph = function(args){var self = this;
    // control info.
    this.version = '0.0.1';
    this.name = 'FGraph';
    
    // handle arguments
	args = args?args:{};
    this.hideFirst = args.hideFirst?args.hideFirst:'';
    this.wps = args.wps?args.wps:'80%,80%,xcenter:0,ycenter:0';

    this.body = W.style('div');
    this.body.id = 'frame';
    if(this.hideFirst) this.body.display = 'none';
    
    this.origin = W.style('div', 'background:');
    this.origin.id = 'origin';
    this.origin.wps = '10,10,xcenter:0,ycenter:0';
    this.body.appendChild(this.origin);
    W.add(this);
    
    W.add(this.origin, this);
    // Add an "onload" event handler for the timer we're going to create below.
    var timer = new TimerControl();
    timer.initialize(1);

    // global
    graphui=new GraphUI();
    graphui.initialize(this.body, this.origin, false, true);
    
    // global
    graph=new Graph();
    graph.initialize( 400, 400 );
    graph.setUI(graphui);    
    timer.subscribe(graph);

    // global
    this.control = new UserControl();
    this.control.initialize(timer, graph, graphui);
    // perform init. arrangement
    this.control.resizeFrame();
    timer.start();        
};


/**
 * Show graph
 *
 * This method displays the graph.
 */
W.FGraph.prototype.show = function(){
    this.body.display = 'block';
};


/**
 * Get node
 *
 * This method returns a node.
 * @param id node ID
 */
W.FGraph.prototype.getNode = function(id){
    return graphui.getNode(id);
};


/**
 * Add node
 *
 * This method adds a node into graph.
 * @param text text to be placed on node
 * @param mass mass of node
 * @param fromOrig true if it's connected to the origin, otherwise, false
 * @param edgeWeight weight of edge
 * @param background (optional) node background (CSS)
 * @param border (optional) node border (CSS)
 */
W.FGraph.prototype.addNode = function(text, mass, fromOrig, edgeWeight, background, border){
    var node = this.control.addNode(text, mass?mass:2, fromOrig?fromOrig:true, edgeWeight);
    if(color && this.getNode( node.id ).style)
        this.getNode( node.id ).style.background = background?background:'';
    if(border && this.getNode( node.id ).style)
        this.getNode( node.id ).style.border = border?border:'';
    return node;
};


/**
 * Add edge
 *
 * This method adds an edge.
 * @param from source node
 * @param to destination
 * @param weight weight of edge
 */
W.FGraph.prototype.addEdge = function(from, to, weight){
    this.control.addEdge(from, to, weight);
};    


/**
 * Set origin text
 *
 * This method places text(html) on the origin.
 * @param html caption (HTML)
 * @test <a href='../../test/3_text_on_origin.html'>3_text_on_origin.html</a>
 */
W.FGraph.prototype.setOrigin = function(html){
    this.origin.appendChild(document.createTextNode(html));
};


//! \cond   loadModules
// load external modules
W.include('control/FGraph/lib', 'event,timer,graph,domui,control');
W.module('scavenger');
//! \endcond

/**
 * @example FGraph.html <a href='../../test/FGraph.html'>Run this code</a>
 */

/**
 * @example CodeExample.html <a href='../../test/CodeExample.html'>Run this code</a>
 */

/**
 * @example example1.html <a href='../../test/example1.html'>Run this code</a>
 */

/**
 * @example example2.html <a href='../../test/example2.html'>Run this code</a>
 */

/**
 * @example 1_bigger_nodes.html <a href='../../test/1_bigger_nodes.html'>Run this code</a>
 */

/**
 * @example 2_snow.html <a href='../../test/2_snow.html'>Run this code</a>
 */

/**
 * @example 3_text_on_origin.html <a href='../../test/3_text_on_origin.html'>Run this code</a>
 */

/**
 * @example 4_text_nodes.html <a href='../../test/4_text_nodes.html'>Run this code</a>
 */

/**
 * @example 5_hide.html <a href='../../test/5_hide.html'>Run this code</a>
 */

/**
 * \mainpage
 * <br><i>"Force Directed Graphs are self-organizing, visually appealing tools for representing relational data. The look is organic, because algorithms simulate the way charged particles arrange in space. They work great in user interfaces because the user has access to data nodes while the graph is being organized."</i><br> - Kyle Scholz
 * <br><br><br>
 * \section intro_sec Introduction
 * Force-directed layout schemes are usually selected for undirected graphs,
 * this being ideal for simulating physical and chemical models. I recently found
 * a nice javascript implementation of this algorithm written by Kyle Scholz and
 * wrapped it in Wednus style.
 * @test <a href='../../test/FGraph.html'>FGraph.html</a> (unit tests)
 * @see <a href='http://www.kylescholz.com/blog/2006/06/force_directed_graphs_in_javas.html'>"Force Directed Graphs in Javascript?"</a>
 * @see <a href='http://www.kylescholz.com/blog/2006/06/using_force_directed_graphs.html'>"Using Force Directed Graphs in Your App"</a>
 *
 *<hr>
 *
 * \section req Requirement
 * - wednus.js
 * - scavenger module
 * - script modules of the <a href='http://www.kylescholz.com/blog/2006/06/first_whack_at_javascript_visu.html'>Force Directed Graphs in Javascript</a> by Kyle Scholz
 *
 *<hr>
 *
 * \section structure Structure
 * FGraph is a type1 Wednus control though provided library by the original
 * author doesn't support multiple graphs on a page yet, and user of this control
 * should have aware of this fact.
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   How to Use
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('FGraph');
 * \endcode
 * <br>
 * \subsection  instant 2. Creating Instance
 * To create a graph, we need to instanciate a FGraph object with some optional parameters.
 * \code
 * var myFGraph = new W.FGraph([hideFirst]);
 * \endcode
 * @param hideFirst true to hide graph first. otherwise, false
 * 
 * <br>
 *
 * \subsection  use 3. Using object
 * After creating a graph object, you can access public member properties and methods as
 * below.
 * \code
 * var node = myFGraph.addNode('hello');
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example creates a graph with two nodes connected to each other.
 * \code
 * <script type='text/javascript'>
 * W.control('FGraph');
 * </script>
 *
 * <script type='text/javascript'>
 * var myFGraph = new W.FGraph();
 * var node1 = myFGraph.addNode('Hello');
 * var node2 = myFGraph.addNode('World');
 *
 * // connect two nodes
 * myFGraph.addEdge(node1, node2);
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do NOT merge script blocks into one because each block is
 * closure.
 *
 * <hr>
 *
 * \section author Authors
 * Kyle Scholz<br>
 * <a href='http://www.kylescholz.com/blog/2006/06/first_whack_at_javascript_visu.html'>Force Directed Graphs in Javascript</a><br><br>
 * Sundew H. Shin<br>
 * http://wednus.com
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */
 
 /**
 * \page release Release Note
 * \section v0_0_1 v0.0.1
 * - implemented simplified interface
 * - fixed <a href='http://www.kylescholz.com/blog/2006/06/using_force_directed_graphs.html#comment-34'>textnode dragging problem</a>
 * - using the Force Directed Graphs library picked up at June 13, 2006 06:06 AM
 *    http://www.kylescholz.com/blog/2006/06/using_force_directed_graphs.html
 */