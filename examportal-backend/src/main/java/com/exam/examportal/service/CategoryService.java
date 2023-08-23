package com.exam.examportal.service;

import com.exam.examportal.model.exam.Category;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public interface CategoryService {

    public Category addCategory(Category category);
    public Category updateCategory(Category category);

    public List<Category> getCategories();

    public Category getCategory(Long categoryId);
    public void deleteCategory(Long categoryId);
}
