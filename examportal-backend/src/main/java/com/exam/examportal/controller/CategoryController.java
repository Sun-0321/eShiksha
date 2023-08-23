package com.exam.examportal.controller;

import com.exam.examportal.model.exam.Category;
import com.exam.examportal.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @PostMapping("")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    @GetMapping("/{catId}")
    public Category getCategory(@PathVariable("catId") Long catId){
        return this.categoryService.getCategory(catId);
    }

    @GetMapping("")
    public List<Category> getCategories(){
        List<Category> categories = this.categoryService.getCategories();
//        return ResponseEntity.ok(categories);
        return categories;
    }


    @PutMapping("")
    public Category updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    @DeleteMapping("/{catId}")
    public void deleteCategory(@PathVariable("catId") Long catId){
        this.categoryService.deleteCategory(catId);;
    }
}
