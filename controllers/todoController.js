import Todo from "../models/todo.js";

const createTodo =(req, res, next) =>{
const todo  = new Todo ({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
});
todo
.save()
.then((result)=>{
    res.status(201).json({
        message:"Task Added Successfully",
        post:{
            ...result,
            id:result.id,
        },
    });
})
.catch((err)=>{
    res.status(500).json({
        message:"Failed To Add Task",
    });
});
};

const getTodos =(req, res, next)=>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const todoQuery = Todo.find();
    let fetchedTodo;
    if(pageSize && currentPage){
        todoQuery.skip(pageSize * (currentPage -1)).limit(pageSize);
    }
    todoQuery
    .then((doc)=>{
        fetchedTodo = doc;
        return Todo.countDocuments();
    })
    .then((count)=>{
        res.status(200).json({
            message:"All task fetched",
            posts: fetchedTodo,
            maxPosts: count,
        });
    })
    .catch((error)=>{
        res.status(500).json({
            message:"Fetching task failed"
        });
    });
};

const getTodoById =(req, res, next)=>{
    Todo.findById(req.params.id)
    .then((post)=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:"Task not found"});
        }
    })
    .catch((error)=>{
        res.status(500).json({
            message:"Fetching Task failed"
        });
    });
};

const updateTodo=(req, res, next)=>{
    const todo =new Todo({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    });
    Todo.updateOne({ _id: req.params.id}, todo)
    .then((result)=>{
        res.status(200).json({
            message:"Update Successful"
        });
    })
    .catch((error)=>{
        res.status(500).json({
            message:"Couldnot Update Task",
        });
    });
};

const deleteTodo =(req, res, next)=>{
    Todo.deleteOne({ _id: req.params.id })
    .then((resp)=>{
        res.status(200).json({message:"Delete Successful"});
    })
    .catch((error)=>{
        res.status(500).jon({message:"Couldnot delet task"});
    });
};


const todoController = { createTodo,getTodoById,getTodos, updateTodo, deleteTodo };
export default todoController;