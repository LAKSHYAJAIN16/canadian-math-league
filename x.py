import matplotlib.pyplot as plt
import networkx as nx

# Create a directed graph
G = nx.DiGraph()

# Define nodes
nodes = [
    "Start\n(hand dealt)",
    "Calculate hand strength\n(sum of card points)",
    "Decide bid\n(aggressive / conservative / pass)",
    "Trick play:\nFollow suit?",
    "Play highest card in suit",
    "Play lowest card in another suit",
    "End of turn"
]

# Add nodes to graph
for node in nodes:
    G.add_node(node)

# Add edges to represent flow
edges = [
    ("Start\n(hand dealt)", "Calculate hand strength\n(sum of card points)"),
    ("Calculate hand strength\n(sum of card points)", "Decide bid\n(aggressive / conservative / pass)"),
    ("Decide bid\n(aggressive / conservative / pass)", "Trick play:\nFollow suit?"),
    ("Trick play:\nFollow suit?", "Play highest card in suit"),
    ("Trick play:\nFollow suit?", "Play lowest card in another suit"),
    ("Play highest card in suit", "End of turn"),
    ("Play lowest card in another suit", "End of turn")
]

G.add_edges_from(edges)

# Draw the graph
plt.figure(figsize=(8,6))
pos = nx.spring_layout(G, seed=42)  # layout for better visualization
nx.draw(G, pos, with_labels=True, arrows=True, node_size=4000, node_color='skyblue', font_size=10, font_weight='bold', edgecolors='black')
plt.title("Heuristic Agent Strategy Flow")
plt.show()
